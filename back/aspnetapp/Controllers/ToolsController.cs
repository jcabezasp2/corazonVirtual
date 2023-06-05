using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace aspnetapp.Controllers
{
    [Route("Herramientas")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
                private readonly dataContext _context;
                private readonly UserManager<IdentityUser> _userManager;
                private readonly RoleManager<IdentityRole> _roleManager;

        public ToolsController(dataContext context, UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        
        
        /// <summary>
        /// Get all tools
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /herramientas
        ///
        /// </remarks>
        /// <returns>Array of tools</returns>
        /// <response code="200">Returns the array of tools</response>
        /// <response code="404">If the array of tools is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tool>>> GetTools()
        {
            if (_context.Tools == null)
            {
                return NotFound();
            }
                return await _context.Tools.ToListAsync();
        }

        /// <summary>
        /// Get a tool by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /herramientas/1
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns>A tool</returns>
        /// <response code="200">Returns the tool</response>
        /// <response code="404">If the tool is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tool>> GetTool(int id)
        {
          if (_context.Tools == null)
          {
              return NotFound();
          }
            var tool = await _context.Tools.FindAsync(id);

            if (tool == null)
            {
                return NotFound();
            }

            return tool;
        }
         
        /// <summary>
        /// Update a tool 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /herramientas/1
        ///      {
        ///        "name": "Tool 1",
        ///        "description": "Description of tool 1",
        ///        "modelo": "file"
        ///        "OptimalScale": 0.1
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="tool"></param>
        /// <returns>Nothing</returns>
        /// <response code="200">Ok</response>
        /// <response code="400">If the id is not equal to the tool id</response>
        /// <response code="404">If the tool is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
      
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTool(int id, Tool tool)
        {
            if (!hasPermission("UpdateTool"))
            {
                return Unauthorized();
            }

            if (id != tool.Id)
            {
                return BadRequest();
            }

            _context.Entry(tool).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToolExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Create a tool 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /herramientas
        ///     {
        ///        "name": "Tool 1",
        ///        "description": "Description of tool 1",
        ///        "modelo": file,
        ///        "OptimalScale": 0.1
        ///     }
        /// 
        /// </remarks>
        /// <param name="tool"></param>
        /// <returns>A newly created tool</returns>
        /// <response code="201">Returns the newly created tool</response>
        /// <response code="400">If the tool is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        public async Task<ActionResult<Tool>> PostTool(Tool tool)
        {
        if (!hasPermission("CreateTool"))
        {
              return Unauthorized();
        }

          if (_context.Tools == null)
          {
              return Problem("Entity set 'dataContext.Tools'  is null.");
          }
            _context.Tools.Add(tool);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTool", new { id = tool.Id }, tool);
        }

        /// <summary>
        /// Delete a tool
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /herramientas/1
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns>Nothing</returns>
        /// <response code="200">Sucess</response>
        /// <response code="404">If the tool is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTool(int id)
        {
            if (!hasPermission("DeleteTool"))
            {
              return Unauthorized();
            }

            if (_context.Tools == null)
            {
                return NotFound();
            }
            var tool = await _context.Tools.FindAsync(id);
            if (tool == null)
            {
                return NotFound();
            }

            _context.Tools.Remove(tool);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToolExists(int id)
        {
            return (_context.Tools?.Any(e => e.Id == id)).GetValueOrDefault();
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
