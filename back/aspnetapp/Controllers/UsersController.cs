using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using aspnetapp.Models;
using aspnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace aspnetapp.Controllers
{
    [Route("usuarios")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtService _jwtService;
        private readonly ApiKeyService _apiKeyService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly dataContext _context;

        public UsersController(
            UserManager<IdentityUser> userManager,
            JwtService jwtService,
            ApiKeyService apiKeyService,
            RoleManager<IdentityRole> roleManager,
            dataContext context
        )
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _apiKeyService = apiKeyService;
            _roleManager = roleManager;
            _context = context;
        }

        /// <summary>
        /// Register an user
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /usuarios/registrar
        ///     {
        ///        "name": "user",
        ///        "email": "user@example",
        ///        "password": "123456"
        ///     }
        ///
        ///</remarks>
        /// <returns>The user data and the ApiKey</returns>
        /// <response code="200">Returns the user data and the ApiKey</response>
        /// <response code="400">If the user data is not valid</response>
        [HttpPost]
        [Route("registrar")]
        public async Task<ActionResult<User>> Register(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userManager.CreateAsync(
                new IdentityUser() { UserName = user.Name, Email = user.Email },
                user.Password
            );

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var createdUser = await _userManager.FindByEmailAsync(user.Email);

            if (createdUser == null)
            {
                return BadRequest("User not found");
            }

            await _userManager.AddToRoleAsync(createdUser, "student");

            var token = _apiKeyService.CreateApiKey(createdUser);

            var roleClaims = await _roleManager.GetClaimsAsync(await _roleManager.FindByNameAsync("student"));           

            createdUser.PasswordHash = "The password is hidden";

            
            var sql = @"INSERT INTO ""ApplicationUsers"" ("" Name"", ""Surname"", ""Photo"" , ""UserId"") VALUES (" + createdUser.UserName + "," + createdUser.UserName + "," + "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" + "," + createdUser.Id + ")";

            _context.Database.ExecuteSqlRaw(sql);

            var retorn = new UserData()  // retorn es un objeto de tipo UserData
            {
                user = createdUser,
                UserApiKey = token,
                Role = "user",
                RoleClaims = roleClaims,
               
            };

           

            return new ObjectResult(retorn) { StatusCode = 201 };

            //return Ok(retorn);
        }

        /// <summary>
        /// Return all users
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /usuarios/getAll
        ///
        ///</remarks>
        /// <returns>All users</returns>
        /// <response code="200">Returns all users</response>
        /// <response code="401">If the user is not authenticated</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        [Route("getAll")]
        public async Task<ActionResult<UserData>> GetAll()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users == null)
            {
                return NotFound("Users not found");
            }
            var appUsers = new List<UserData>();

            foreach (var user in users)
            {
                user.PasswordHash = "The password is hidden";
                var role = await _userManager.GetRolesAsync(user);
                var roleClaims = await _roleManager.GetClaimsAsync(await _roleManager.FindByNameAsync(role[0]));
                var applicationUser = await _context.ApplicationUsers.FindAsync(user.Id);

                var appUser = new UserData()
                {
                    user = user,
                    Role = role[0],
                    RoleClaims = roleClaims,
                    isLocked = await _userManager.IsLockedOutAsync(user),
                    ApplicationUser = applicationUser,
                   
                };

                appUsers.Add(appUser);
            }

            return Ok(appUsers);
        }

        /// <summary>
        /// Return the user data and the ApiKey
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /usuarios/getUsuario
        /// 
        ///</remarks>
        /// <returns>The user data and the ApiKey</returns>
        /// <response code="200">Returns the user data and the ApiKey</response>
        /// <response code="401">If the user is not authenticated</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        [Route("getUsuario")]
        public async Task<ActionResult<User>> GetUserData()
        {

            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var role = await _userManager.GetRolesAsync(user);
            var claims = await _userManager.GetClaimsAsync(user);
            var roleClaims = await _roleManager.GetClaimsAsync(await _roleManager.FindByNameAsync(role[0]));
            var isLocked = await _userManager.IsLockedOutAsync(user);
            // var applicationUser = await _context.ApplicationUsers.FindAsync(user.Id);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.PasswordHash = "The password is hidden";

            var result = new UserData()
            {
                user = user,
                Role = role[0],
                RoleClaims = roleClaims,
                isLocked = isLocked,
                // ApplicationUser = applicationUser,
            };

            return Ok(result);
        }

        /// <summary>
        /// Login a user and return the user data and the Token
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /usuarios/login
        ///     {
        ///        "email": "user@example",
        ///        "password": "123456"
        ///     }
        ///</remarks>
        /// <returns>The token and the expiration date</returns>
        [HttpPost("token")]
        public async Task<ActionResult<AuthenticationResponse>> CreateBearerToken(AuthenticationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Bad credentials");
            }

            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isPasswordValid)
            {
                return BadRequest("Invalid password");
            }

            var token = _jwtService.CreateToken(user);

            return Ok(token);
        }


        /// <summary>
        /// Login a user and return the user data and the ApiKey
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /usuarios/login
        ///     {
        ///        "email": "user@example",
        ///        "password": "123456"
        ///     }
        ///</remarks>
        /// <returns>The user data and the ApiKey</returns>
        /// <response code="200">Returns the user data and the ApiKey</response>
        /// <response code="400">Error in the request</response>
        /// <response code="404">If the user is not found</response>
        /// <response code="401">If the user is not authenticated</response>
        [HttpPost("login")]
        public async Task<ActionResult> CreateApiKey(AuthenticationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return NotFound("El usuario no existe");
            }

            if(user.LockoutEnabled == true)
            {
                return Unauthorized("El usuario está bloqueado");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isPasswordValid)
            {
                return Unauthorized("La contraseña es incorrecta");
            }

            var token = _apiKeyService.CreateApiKey(user);

            user.PasswordHash = "The password is hidden";

            var role = await _userManager.GetRolesAsync(user);

            var roleClaims = await _roleManager.GetClaimsAsync(await _roleManager.FindByNameAsync(role[0]));



            var retorn = new UserData()
            {
                user = user,
                UserApiKey = token,
                Role = role.ToArray()[0],
                RoleClaims = roleClaims,
            };

            return Ok(retorn);
        }

        /// <summary>
        /// Add a claim to a user
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /usuarios/addClaim
        ///     {
        ///        "userId": "e046c7d5-4a8a-4ad8-a53b-930bde50339a",
        ///        "type": "type",
        ///        "value": "value"
        ///     }
        ///</remarks>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the user is null or the password is invalid</response>

        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        [Route("addClaim")]
        public async Task<ActionResult<User>> AddClaimToUSer(AddClaimToUSer permission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(permission.UserId);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var result = await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim(permission.Type, permission.Value));

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        /// <summary>
        /// uptade the user data
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /usuarios/updateUsuario
        ///     {
        ///        "id": "e046c7d5-4a8a-4ad8-a53b-930bde50339a",
        ///        "name": "name",
        ///        "email": "email",
        ///        "password": "password",
        ///        "surname": "surname",
        ///        "photo": "photo",
        ///     }
        ///</remarks>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the user is null or the password is invalid</response>
        /// <response code="401">If the user is not authenticated</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(string id, User user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userToUpdate = await _userManager.FindByIdAsync(id);
            if (userToUpdate == null)
            {
                return BadRequest("User not found");
            }
            userToUpdate.UserName = user.Name;           
            userToUpdate.Email = user.Email;
            userToUpdate.PasswordHash = user.Password;

        //   var applicationUserToUpdate = await _context.ApplicationUsers.FindAsync(id);

            var sql = @"UPDATE ""ApplicationUsers"" SET ""Name"" = "" + applicationUserToUpdate.name + ""Surname"" = "" + applicationUserToUpdate.surname + ""Photo"" = "" + applicationUserToUpdate.photo +  WHERE ""UserId"" = " + id + "";

            _context.Database.ExecuteSqlRaw(sql);  
      
        //   if (applicationUserToUpdate == null)
        //     {
        //         return BadRequest("User not found");
        //     }

        //     applicationUserToUpdate.Name = applicationUser.Name;
        //     applicationUserToUpdate.Surname = applicationUser.Surname;
        //     applicationUserToUpdate.Photo = applicationUser.Photo;
           
         
            var result = await _userManager.UpdateAsync(userToUpdate);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var result2 = await _context.SaveChangesAsync();

            if (result2 == 0)
            {
                return BadRequest("Error al actualizar application user");
            }
            
            return Ok(userToUpdate);


            // if (!ModelState.IsValid)
            // {
            //     return BadRequest(ModelState);
            // }

            // var userToUpdate = await _userManager.FindByIdAsync(id);

            // if (userToUpdate == null)
            // {
            //     return BadRequest("Usuario no encontrado");
            // }

            // if (user.Name != userToUpdate.UserName)
            // {
            //     _userManager.SetUserNameAsync(userToUpdate, user.Name);
            // }

            // if (user.Email != userToUpdate.Email)
            // {
            //     _userManager.SetEmailAsync(userToUpdate, user.Email);
            // }

            // if (user.Password != null)
            // {
            //     _userManager.RemovePasswordAsync(userToUpdate);
            //     _userManager.AddPasswordAsync(userToUpdate, user.Password);
            // }

            // var result = _userManager.UpdateAsync(userToUpdate);

            // if (result.IsCompletedSuccessfully)
            // {
            //     return Ok();
            // }

            // return BadRequest("Error al actualizar el usuario");

        }

        /// <summary>
        /// Get a practices by student id
        /// </summary>
        /// <param name="id"></param>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET usuarios/3/practicas/
        ///
        /// </remarks>
        /// <returns>An array with all the practices of the student</returns>
        /// <response code="200">Returns the practices</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Forbidden</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{id}/practicas")]
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        public async Task<ActionResult<IEnumerable<Practice>>> GetPractice(string id)
        {


            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var practices = await _context.Practices.Where(p => p.UserId == user.Id).ToListAsync();

            if (practices == null)
            {
                return NotFound();
            }

            return practices;
        }

        /// <summary>
        /// Get all students
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET usuarios/students
        ///
        /// </remarks>
        /// <returns>An array with all the students</returns>
        /// <response code="200">Returns the students</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Forbidden</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("estudiantes")]
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        public async Task<ActionResult<IEnumerable<User>>> GetStudents()
        {
            var students = await _userManager.GetUsersInRoleAsync("student");

            if (students == null)
            {
                return NotFound();
            }

            foreach (var student in students)
            {
                student.PasswordHash = "The password is hidden";
            }

            return Ok(students);
        }

        /// <summary>
        /// Lock or unlock a user
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST usuarios/lockUnlock
        ///     "id"
        ///
        /// </remarks>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the user is null or with ADMIN role</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPost("bloquearDesbloquear")]
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        public async Task<ActionResult> LockUnlockUser([FromBody] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var role = await _userManager.GetRolesAsync(user);
            if(role[0] == "ADMIN"){
                return BadRequest("No puedes bloquear a un admin");
            }

            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (user.SecurityStamp == null)
            {
                // If the security stamp is null, retrieve it or regenerate it.
                //user.SecurityStamp = await _userManager.GetSecurityStampAsync(user);
                // Alternatively, you can regenerate the security stamp using:
                user.SecurityStamp = Guid.NewGuid().ToString();
            }
            
            var responseMsg = "";

            if (user.LockoutEnabled)
            {
                user.LockoutEnabled = false;
                responseMsg = "Usuario desbloqueado";
            }
            else
            {
                user.LockoutEnabled = true;
                responseMsg = "Usuario bloqueado";
            }

            await _userManager.UpdateAsync(user);

            return Ok(responseMsg);
        }

        private bool hasPermission(string permission)
        {
            var user = _userManager.FindByNameAsync(User.Identity.Name).Result;
            var role = _userManager.GetRolesAsync(user).Result;
            var roleClaims = _roleManager.GetClaimsAsync(_roleManager.FindByNameAsync(role[0]).Result).Result;

            return roleClaims.Any(c => c.Value == permission);
        }
        
       
    }
}