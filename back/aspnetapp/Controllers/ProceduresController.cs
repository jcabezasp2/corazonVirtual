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
    [Route("procedimientos")]
    [ApiController]
    public class ProceduresController : ControllerBase
    {
        private readonly dataContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ProceduresController(dataContext context, UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        /// <summary>
        /// Get all procedures
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /procedimientos
        ///
        /// </remarks>
        /// <returns>Array of procedures</returns>
        /// <response code="200">Returns the array of procedures</response>
        /// <response code="404">If the procedures array is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Procedure>>> GetProcedures()
        {
            if (_context.Procedures == null)
            {
                return NotFound();
            }

            var procedures = await _context.Procedures.ToListAsync();

            procedures.ForEach(p =>
            {
                p.Steps = _context.ProcedureStep.Where(ps => ps.ProcedureId == p.Id).OrderBy(ps => ps.Order).ToList();
            });

            return procedures;
        }

        /// <summary>
        /// Get a procedure by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /procedimientos/1
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns>A procedure</returns>
        /// <response code="200">Returns the procedure</response>
        /// <response code="404">If the procedure is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Procedure>> GetProcedure(int id)
        {
            if (_context.Procedures == null)
            {
                return NotFound();
            }
            var procedure = await _context.Procedures.FindAsync(id);

            if (procedure == null)
            {
                return NotFound();
            }

            procedure.Steps = _context.ProcedureStep.Where(ps => ps.ProcedureId == procedure.Id).OrderBy(ps => ps.Order).ToList();

            return procedure;
        }

        /// <summary>
        /// Update a procedure
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /procedimientos/1
        ///     {
        ///        "name": "string",
        ///        "image": "string"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="procedure"></param>
        /// <returns>Nothing</returns>
        /// <response code="200">Ok</response>
        /// <response code="400">If the id is not equal to the procedure id</response>
        /// <response code="404">If the procedure is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcedure(int id, Procedure procedure)
        {
            if (!hasPermission("UpdateProcedure"))
            {
                return Unauthorized();
            }

            if (_context.Procedures == null)
            {
                return NotFound();
            }

            var oldProcedure = _context.Procedures.Find(id);

            if (oldProcedure == null)
            {
                return NotFound();
            }

            oldProcedure.Name = procedure.Name;
            oldProcedure.Image = procedure.Image;

            await _context.SaveChangesAsync();

            return Ok();

        }

        /// <summary>
        /// Create a procedure
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /procedimientos
        ///     {
        ///        "name": "string",
        ///        "image": "string",
        ///     }
        ///
        /// </remarks>
        /// <param name="procedure"></param>
        /// <returns>A procedure</returns>
        /// <response code="201">Returns the procedure</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        public async Task<ActionResult<Procedure>> PostProcedure(Procedure procedure)
        {
        
            if (!hasPermission("CreateProcedure"))
            {
                return Unauthorized();
            }

            if (_context.Procedures == null)
            {
                return Problem("Entity set 'dataContext.Procedures'  is null.");
            }
            _context.Procedures.Add(procedure);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProcedure), new { id = procedure.Id }, procedure);
        }

        /// <summary>
        /// Delete a procedure
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /procedimientos/1
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns>Nothing</returns>
        /// <response code="204">Success</response>
        /// <response code="404">If the procedure is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcedure(int id)
        {
            if (!hasPermission("DeleteProcedure"))
            {
                return Unauthorized();
            }

            if (_context.Procedures == null)
            {
                return NotFound();
            }
            var procedure = await _context.Procedures.FindAsync(id);
            if (procedure == null)
            {
                return NotFound();
            }

            _context.Procedures.Remove(procedure);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProcedureExists(int id)
        {
            return (_context.Procedures?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        /// <summary>
        /// Get all steps of a procedure
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /procedimientos/1/pasos
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns>Array of steps</returns>
        /// <response code="200">Returns the array of steps</response>
        /// <response code="404">If the procedure is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet("{id}/pasos")]
        public async Task<ActionResult<IEnumerable<Step>>> GetProcedureSteps(int id)
        {
            if (_context.Procedures == null)
            {
                return NotFound();
            }
            var procedure = await _context.Procedures.FindAsync(id);
            if (procedure == null)
            {
                return NotFound();
            }

            var procedureSteps = await _context.ProcedureStep.Where(ps => ps.ProcedureId == procedure.Id).ToListAsync();
            if (procedureSteps == null)
            {
                return NotFound();
            }

            var steps = new List<Step>();
            foreach (var procedureStep in procedureSteps)
            {
                var step = await _context.Steps.FindAsync(procedureStep.StepId);
                if (step == null)
                {
                    return NotFound();
                }

                var tools = await _context.Tools.Where(s => s.Steps.Contains(step)).ToListAsync();
                step.Tools = tools;

                steps.Add(step);
            }

            return steps;
        }

        /// <summary>
        /// Add steps to a procedure
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /procedimientos/1/pasos
        ///   [
        ///      0,1,2
        ///   ]
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="stepIds"></param>
        /// <returns>Nothing</returns>
        /// <response code="200">Returns nothing</response>
        /// <response code="404">If the procedure or the steps are null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is a connection failure with the database </response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost("{id}/pasos")]
        public async Task<ActionResult<Procedure>> PostProcedureStep(int id, int[] stepIds)
        {
            if (!hasPermission("CreateProcedure"))
            {
                return Unauthorized();
            }

            if (_context.Procedures == null)
            {
                return NotFound();
            }
            var procedure = await _context.Procedures.FindAsync(id);
            if (procedure == null)
            {
                return NotFound();
            }
            if (stepIds == null)
            {
                return NotFound();
            }

            var index = 0;

            foreach (var stepId in stepIds)
            {
                var step = await _context.Steps.FindAsync(stepId);
                if (step == null)
                {
                    return NotFound();
                }
                var procedureStep = new ProcedureStep
                {
                    ProcedureId = procedure.Id,
                    StepId = step.Id,
                    Order = index
                };
                index++;
                _context.ProcedureStep.Add(procedureStep);
            }

            await _context.SaveChangesAsync();

            return Ok();
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
