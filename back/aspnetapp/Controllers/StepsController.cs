using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetapp.Models;
using Microsoft.AspNetCore.Authorization;

namespace aspnetapp.Controllers
{
    [Route("pasos")]
    [ApiController]
    public class StepsController : ControllerBase
    {
        private readonly dataContext _context;

        public StepsController(dataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all steps
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /pasos
        ///
        /// </remarks>
        /// <returns>Array of steps</returns>
        /// <response code="200">Returns the array of steps</response>
        /// <response code="404">If the array of steps is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Step>>> GetSteps()
        {
          if (_context.Steps == null)
          {
              return NotFound();
          }

            var steps = await _context.Steps.ToListAsync();

            if (steps == null)
            {
                return NotFound();
            }

            steps.ForEach(s =>
                s.Tools = _context.Tools.Where(t => t.Steps.Contains(s)).ToList() 
             );

            return steps;
        }

        /// <summary>
        /// Get a step by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /pasos/1
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns>A step</returns>
        /// <response code="200">Returns the step</response>
        /// <response code="404">If the step is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Step>> GetStep(int id)
        {
          if (_context.Steps == null)
          {
              return NotFound();
          }
            var step = await _context.Steps.FindAsync(id);

            if (step == null)
            {
                return NotFound();
            }

            return step;
        }

        /// <summary>
        /// Update a step
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /pasos/1
        ///     {
        ///        "name": "Step 1",
        ///        "description": "Description of step 1",
        ///        "image": file,
        ///        "duration": "10"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="step"></param>
        /// <returns>Nothing</returns>
        /// <response code="200">Ok</response>
        /// <response code="400">If the id is not equal to the step id</response>
        /// <response code="404">If the step is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStep(int id, Step step)
        {
            if(_context.Steps == null)
            {
                return NotFound();
            }

            var oldStep = await _context.Steps.FindAsync(id);

            if (oldStep == null)
            {
                return NotFound();
            }

            oldStep.Name = step.Name;
            oldStep.Description = step.Description;
            oldStep.Image = step.Image;
            oldStep.duration = step.duration;

            await _context.SaveChangesAsync();

            return Ok();
        }

        /// <summary>
        /// Create a step
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /pasos
        ///     {
        ///        "name": "Step 1",
        ///        "description": "Description of step 1",
        ///        "image": file,
        ///        "duration": "10"
        ///     }
        /// 
        /// </remarks>
        /// <param name="step"></param>
        /// <returns>A newly created step</returns>
        /// <response code="201">Returns the newly created step</response>
        /// <response code="400">If the step is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        public async Task<ActionResult<Step>> PostStep(Step step)
        {
          if (_context.Steps == null)
          {
              return Problem("Entity set 'dataContext.Steps'  is null.");
          }
            _context.Steps.Add(step);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStep", new { id = step.Id }, step);
        }

        /// <summary>
        /// Delete a step
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /pasos/1
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <returns>Nothing</returns>
        /// <response code="200">Sucess</response>
        /// <response code="404">If the step is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStep(int id)
        {
            if (_context.Steps == null)
            {
                return NotFound();
            }
            var step = await _context.Steps.FindAsync(id);
            if (step == null)
            {
                return NotFound();
            }

            _context.Steps.Remove(step);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool StepExists(int id)
        {
            return (_context.Steps?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet("{id}/herramientas")]
        public async Task<ActionResult<IEnumerable<Tool>>> GetToolsByStep(int id)
        {
            var step = await _context.Steps.FindAsync(id);

            if (step == null)
            {
                return NotFound();
            }

            var tools = await _context.Tools.Where(s=> s.Steps.Contains(step)).ToListAsync();

            if (tools == null)
            {
                return NotFound();
            }

            return tools;
        }




        /// <summary>
        /// Add tools to a step
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /pasos/1/herramientas
        ///     [
        ///       1
        ///     ]
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="toolId"></param>      
        /// <returns>Nothing</returns>
        /// <response code="200">Ok</response>
        /// <response code="400">If the id is not equal to the step id</response>
        /// <response code="404">If the step or the tool is null</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="500">If there is an internal server error</response>

        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost("{id}/herramientas")]
        public async Task<IActionResult> AddToolToStep(int id, int toolId)
        {
             var step = await _context.Steps.SingleOrDefaultAsync(s => s.Id == id);

             
                if (step == null)
                {
                    return NotFound();
                }
                
            var toolToAdd = await _context.Tools.FirstOrDefaultAsync(t => t.Id == toolId);

                if (toolToAdd == null)
                {
                    return NotFound();
                }

                step.Tools.Add(toolToAdd);

                await _context.SaveChangesAsync();

                return Ok();
        //     if (_context.Steps == null)
        //   {
        //       return NotFound();
        //   }
        //     var step = await _context.Steps.FindAsync(id);

        //     if (step == null)
        //     {
        //         return NotFound();
        //     }
           
        //     var toolToAdd = await _context.Tools.FindAsync(toolId);

        //     if (toolToAdd == null)
        //     {
        //         return NotFound();
        //     }
       
        //     step.Tools.Add(toolToAdd);

        //     await _context.SaveChangesAsync();

        //     return Ok();
        }

    }
}
