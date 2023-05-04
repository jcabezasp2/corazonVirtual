using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using aspnetapp.Models;
using aspnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace aspnetapp.Controllers
{
    [Route("/roles")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;

        public RoleController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager
        )
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        /// <summary>
        /// Create a role
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /rol/create
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
        ///     POST /rol/delete
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
        ///     POST /rol/adduser
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
        [Route("adduser")]
        public async Task<ActionResult<Role>> AddUserToRole(UserRole userRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(userRole.UserEmail);

            if (user == null)
            {
                return BadRequest("User not found");
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
    }
}