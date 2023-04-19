using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using aspnetapp.Models;

namespace aspnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UsersController(
            UserManager<IdentityUser> userManager
        ) {
            _userManager = userManager;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
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

            user.Password = null;
            return Created("", user);
        }

        // GET: api/Users/email
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            return new User() { Name = user.UserName, Email = user.Email };
        }
    }
}