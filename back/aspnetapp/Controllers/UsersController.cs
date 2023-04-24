using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using aspnetapp.Models;
using aspnetapp.Services;
using Microsoft.AspNetCore.Authorization;
namespace aspnetapp.Controllers
{
    [Route("")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtService _jwtService;
        private readonly ApiKeyService _apiKeyService;

        public UsersController(
            UserManager<IdentityUser> userManager,
            JwtService jwtService,
            ApiKeyService apiKeyService
        )
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _apiKeyService = apiKeyService;
        }

        // POST: register
        [HttpPost]
        [Route("register")]
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

            var token = _jwtService.CreateToken(createdUser);

            return Ok(token);
        }

        // POST: userdata
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        [Route("userdata")]
        public async Task<ActionResult<User>> GetUserData()
        {
            var user = HttpContext.User;

            return new User() { Name = user.Identity.Name, Email = user.Identity.Name, Password = "The password is not returned" };
        }

        // POST: login
        [HttpPost("login")]
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
        [HttpPost("ApiKey")]
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

            return Ok(token);
        }
    }
}