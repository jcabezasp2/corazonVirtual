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

        // POST: register
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

            var token = _jwtService.CreateToken(createdUser).ToString();

            var roleClaims = await _roleManager.GetClaimsAsync(await _roleManager.FindByNameAsync("student"));

            createdUser.PasswordHash = "The password is hidden";

            var retorn = new UserData()  // retorn es un objeto de tipo UserData
            {
                user = createdUser,
                Token = token,
                Role = "user",
                RoleClaims = roleClaims,
            };

            return Ok(retorn);
        }

        // GET: getAll
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

        // POST: userdata
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

        // POST: token
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
        // NO esta en funcionamiento aun
        // POST: api/Users/ApiKey
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



            var retorn = new UserData()  // retorn es un objeto de tipo UserData
            {
                user = user,
                UserApiKey = token,
                Role = role.ToArray()[0],
                RoleClaims = roleClaims,
            };

            return Ok(retorn);
        }

        //POST: addClaim
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
        
        //PUT: updateUsuario
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