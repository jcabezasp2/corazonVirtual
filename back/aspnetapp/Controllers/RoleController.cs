using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using aspnetapp.Models;
using aspnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace aspnetapp.Controllers
{
    [Route("/roles")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly dataContext _context;

        public RoleController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            dataContext context
        )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        /// <summary>
        /// Create a role
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /roles/create
        ///     {
        ///        "name": "admin"
        ///     }
        ///
        /// </remarks>
        /// <param name="role"></param>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the role is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<Role>> Create(Role role)
        {
            if (!hasPermission("CreateRole"))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _roleManager.CreateAsync(
                new IdentityRole() { Name = role.Name }
            );

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        /// <summary>
        /// Delete a role
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /roles/delete
        ///     {
        ///        "name": "admin"
        ///     }
        ///
        /// </remarks>
        /// <param name="role"></param>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the role is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        [Route("delete")]
        public async Task<ActionResult<Role>> Delete(Role role)
        {
            if (!hasPermission("DeleteRole"))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _roleManager.DeleteAsync(
                new IdentityRole() { Name = role.Name }
            );

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        /// <summary>
        /// Add a user to a role
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /roles/adduser
        ///     {
        ///        "userEmail": "admin@admin",
        ///        "roleName": "admin"
        ///     }
        ///
        /// </remarks>
        /// <param name="userRole"></param>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the user or role is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        [Route("changeUserRole")]
        public async Task<ActionResult<Role>> AddUserToRole(UserRole userRole)
        {
            if (!hasPermission("CreateUser"))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(userRole.UserEmail);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var existingRoles = await _userManager.GetRolesAsync(user);

            if (existingRoles.Contains(userRole.RoleName))
            {
                return BadRequest("User already has this role");
            }

            var resultRemove = await _userManager.RemoveFromRolesAsync(user, existingRoles);

            if (!resultRemove.Succeeded)
            {
                return BadRequest(resultRemove.Errors);
            }

            var result = await _userManager.AddToRoleAsync(
                user,
                userRole.RoleName
            );

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        /// <summary>
        /// add permission to a role
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /rol/addPermission
        ///     {
        ///        "roleId": "admin",
        ///        "type": "permission",
        ///        "value": "value"
        ///     }
        ///
        /// </remarks>
        /// <param name="permission"></param>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="400">If the role is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        [Route("addPermission")]
        public async Task<ActionResult<Role>> AddPermissionToRole(AddClaimToRole permission)
        {
            if (!hasPermission("CreateRole"))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = await _roleManager.FindByIdAsync(permission.RoleId);

            if (role == null)
            {
                return BadRequest("Role not found");
            }

            var result = await _roleManager.AddClaimAsync(
                role,
                new System.Security.Claims.Claim(permission.Type, permission.Value)
            );

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        /// <summary>
        /// Get all roles
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /roles/getAll
        ///
        /// </remarks>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        [Route("getAll")]
        public async Task<ActionResult<Role>> GetAll()
        {
            var roles = await _roleManager.Roles.ToListAsync();

            return Ok(roles);
        }

        /// <summary>
        /// Get all claims
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /roles/getAllClaims
        ///
        /// </remarks>
        /// <returns>Ok</returns>
        /// <response code="200">Returns Ok</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        [Route("getAllClaims")]
        public async Task<ActionResult<string>> GetAllClaims()
        {
            var claims = await _context.Permissions.ToListAsync();
            return Ok(claims);
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