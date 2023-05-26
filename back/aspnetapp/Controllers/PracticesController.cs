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


                var ApiKey = Request.Headers["Api-Key"].ToString();

               var user = await _userManager.FindByNameAsync(User.Identity.Name);


                if(user == null)
                {
                    return Unauthorized();
                }

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

                return Ok(practice);
            }

            /// <summary>
            /// Change the practice
            /// </summary>
            /// <param name="id"></param>
            /// <param name="practice"></param>
            /// <remarks>
            /// Sample request:
            ///
            ///     PUT /practicas/1
            ///     {
            ///        "date": "2023-05-20T13:52:50.921Z",
            ///        "observations": "Observations",
            ///        "duration": 60,
            ///        "procedureId": 1,
            ///        "stepId": 1
            ///     }
            ///
            /// </remarks>
            /// <returns>The practice updated</returns>
            /// <response code="200">Returns the practice updated</response>
            /// <response code="400">Bad request</response>
            /// <response code="401">Unauthorized</response>
            /// <response code="403">Forbidden</response>
            /// <response code="404">Not found</response>
            /// <response code="500">Internal server error</response>
            [HttpPut("{id}")]
            [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
            public async Task<IActionResult> PutPractice(int id, bool IsFinished, int Duration, DateTime Date)
            {

                var oldPractice = await _context.Practices.FindAsync(id);
            
                if(oldPractice == null)
                {
                    return NotFound();
                }

                oldPractice.Date = Date;
                oldPractice.Duration = Duration;
                oldPractice.IsFinished = IsFinished;

                await _context.SaveChangesAsync();

                return Ok(oldPractice);              
            }

            /// <summary>
            /// Add an observation to the practice
            /// </summary>
            /// <param name="id"></param>
            /// <param name="observation"></param>
            /// <remarks>
            /// Sample request:
            ///
            ///     PUT /practicas/1/observation
            ///     {
            ///        "observation": "Observations"
            ///     }
            ///
            /// </remarks>
            /// <returns>The practice updated</returns>
            /// <response code="200">Returns the practice updated</response>
            /// <response code="400">Bad request</response>
            /// <response code="401">Unauthorized</response>
            /// <response code="403">Forbidden</response>
            /// <response code="404">Not found</response>
            /// <response code="500">Internal server error</response>
            [HttpPut("{id}/observation")]
            [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
            public async Task<IActionResult> AddObservationToPractice(int id, String observation)
            {

                var oldPractice = await _context.Practices.FindAsync(id);
            
                if(oldPractice == null)
                {
                    return NotFound();
                }

                oldPractice.Observations = observation;


                _context.SaveChangesAsync();

                return Ok(oldPractice);              
            }
            
            /// <summary>
            /// Finish the practice
            /// </summary>
            /// <param name="id"></param>
            /// <remarks>
            /// Sample request:
            ///
            ///     PUT /practicas/1/finish
            ///
            /// </remarks>
            /// <returns>The practice updated</returns>
            /// <response code="200">Returns the practice updated</response>
            /// <response code="400">Bad request</response>
            /// <response code="401">Unauthorized</response>
            /// <response code="403">Forbidden</response>
            /// <response code="404">Not found</response>
            /// <response code="500">Internal server error</response>
            [HttpDelete("{id}")]
            [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
            public async Task<IActionResult> DeletePractice(int id)
            {
                var practice = await _context.Practices.FindAsync(id);
                if (practice == null)
                {
                    return NotFound();
                }

                _context.Practices.Remove(practice);
                await _context.SaveChangesAsync();

                return NoContent();
            }


        }
}