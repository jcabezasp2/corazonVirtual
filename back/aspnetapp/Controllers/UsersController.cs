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

        public UsersController(
            UserManager<IdentityUser> userManager,
            JwtService jwtService,
            ApiKeyService apiKeyService,
            RoleManager<IdentityRole> roleManager
        )
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _apiKeyService = apiKeyService;
            _roleManager = roleManager;
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

            if(createdUser == null)
            {
                return BadRequest("User not found");
            }

            await _userManager.AddToRoleAsync(createdUser, "student");

            var token = _apiKeyService.CreateApiKey(createdUser);

            var roleClaims = await _roleManager.GetClaimsAsync(await _roleManager.FindByNameAsync("student"));

            createdUser.PasswordHash = "The password is hidden";

            var retorn = new UserData()  // retorn es un objeto de tipo UserData
            {
                user = createdUser,
                UserApiKey = token,
                Role = "user",
                RoleClaims = roleClaims,
            };

            return Ok(retorn);
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
        public async Task<ActionResult<User>> GetAll()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users == null)
            {
                return BadRequest("Users not found");
            }

            users.ForEach(async user =>
            {
                user.PasswordHash = "The password is hidden";
            });

            return Ok(users);
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
                return BadRequest("Bad credentials");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isPasswordValid)
            {
                return BadRequest("Bad credentials");
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
        ///        "password": "password"
        ///     }
        ///</remarks>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the user is null or the password is invalid</response>
        /// <response code="401">If the user is not authenticated</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPut]
        [Route("updateUsuario")]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userToUpdate = await _userManager.FindByIdAsync(user.Id);

            if (userToUpdate == null)
            {
                return BadRequest("User not found");
            }

            userToUpdate.UserName = user.Name;
            userToUpdate.Email = user.Email;
            userToUpdate.PasswordHash = user.Password;

            
            var result = await _userManager.UpdateAsync(userToUpdate);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }
    }
}