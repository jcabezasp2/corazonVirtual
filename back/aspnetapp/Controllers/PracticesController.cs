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
        [Route("practicas")]
        [ApiController]
        public class PracticeController : ControllerBase
        {
            private readonly dataContext _context;
            private readonly UserManager<IdentityUser> _userManager;

            public PracticeController(
                dataContext context
                , UserManager<IdentityUser> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            /// <summary>
            /// Get all practices
            /// </summary>
            /// <remarks>
            /// Sample request:
            ///
            ///     GET /practicas
            ///
            /// </remarks>
            /// <returns>An array with all the practices</returns>
            /// <response code="200">Returns the practices</response>
            /// <response code="401">Unauthorized</response>
            /// <response code="403">Forbidden</response>
            /// <response code="500">Internal server error</response>
            [HttpGet]
            [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
            public async Task<ActionResult<IEnumerable<Practice>>> GetPractices()
            {
                return await _context.Practices.ToListAsync();
            }


            /// <summary>
            /// Get a practice by student id
            /// </summary>
            /// <param name="id"></param>
            /// <remarks>
            /// Sample request:
            ///
            ///     GET /practicas/1
            ///
            /// </remarks>
            /// <returns>An array with all the practices of the student</returns>
            /// <response code="200">Returns the practices</response>
            /// <response code="401">Unauthorized</response>
            /// <response code="403">Forbidden</response>
            /// <response code="500">Internal server error</response>
            [HttpGet("{id}")]
            [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
            public async Task<ActionResult<IEnumerable<Practice>>> GetPractice(string id)
            {
                

                var user = await _userManager.FindByNameAsync(User.Identity.Name);

                var practices = await _context.Practices.Where(p => p.UserId == user.Id).ToListAsync();

                if (practices == null)
                {
                    return NotFound();
                }

                return practices;
            }

            /// <summary>
            /// Create a practice
            /// </summary>
            /// <param name="practice"></param>
            /// <remarks>
            /// Sample request:
            ///
            ///     POST /practicas
            ///     {
            ///        "date": "2021-05-05T00:00:00",
            ///        "observations": "Observations",
            ///        "duration": 60,
            ///        "procedureId": 1,
            ///        "stepId": 1
            ///     }
            ///
            /// </remarks>
            /// <returns>The practice saved</returns>
            /// <response code="201">Returns the practice saved</response>
            /// <response code="400">Bad request</response>
            /// <response code="401">Unauthorized</response>
            /// <response code="403">Forbidden</response>
            /// <response code="500">Internal server error</response>
            [HttpPost]
            [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
            public async Task<ActionResult<Practice>> PostPractice(Practice practice)
            {


                var user = await _userManager.FindByNameAsync(User.Identity.Name);


                practice.UserId = user.Id;

                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if(!await _context.Procedures.AnyAsync(p => p.Id == practice.ProcedureId))
                {
                    return BadRequest("Procedure not found");
                }

                if(!await _context.Steps.AnyAsync(p => p.Id == practice.StepId))
                {
                    return BadRequest("Step not found");
                }

                _context.Practices.Add(practice);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPractice", new { id = practice.Id }, practice);
            }
        }

}