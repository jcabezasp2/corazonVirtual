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
    [Route("procedimientos")]
    [ApiController]
    public class ProceduresController : ControllerBase
    {
        private readonly dataContext _context;

        public ProceduresController(dataContext context)
        {
            _context = context;
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
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Procedure>>> GetProcedures()
        {
          if (_context.Procedures == null)
          {
              return NotFound();
          }

            var procedures = await _context.Procedures.ToListAsync();

            procedures.ForEach(p => {
                p.Steps = _context.Steps.Where(s => s.Procedures.Contains(p)).ToList();
            });

            return procedures;
        }

        // GET: api/Procedures/5
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

            procedure.Steps = _context.Steps.Where(s => s.Procedures.Contains(procedure)).ToList();

            return procedure;
        }

        // PUT: api/Procedures/5
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcedure(int id, Procedure procedure)
        {
            if (id != procedure.Id)
            {
                return BadRequest();
            }

            _context.Entry(procedure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcedureExists(id))
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

        // POST: api/Procedures
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        public async Task<ActionResult<Procedure>> PostProcedure(Procedure procedure)
        {
          if (_context.Procedures == null)
          {
              return Problem("Entity set 'dataContext.Procedures'  is null.");
          }
            _context.Procedures.Add(procedure);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetProcedure", new { id = procedure.Id }, procedure);
            return CreatedAtAction(nameof(GetProcedure), new { id = procedure.Id }, procedure);
        }

        // DELETE: api/Procedures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcedure(int id)
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

            _context.Procedures.Remove(procedure);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProcedureExists(int id)
        {
            return (_context.Procedures?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        // GET: api/Procedures/5/steps
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet("{id}/steps")]
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
            var steps = await _context.Steps.Where(s => s.Procedures.Contains(procedure)).ToListAsync();
            if (steps == null)
            {
                return NotFound();
            }
            return steps;
        }

        // POST api/Procedures/5/steps
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost("{id}/steps")]
        public async Task<ActionResult<Procedure>> PostProcedureStep(int id, int[] stepIds)
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
            var steps = await _context.Steps.Where(s => stepIds.Contains(s.Id)).ToListAsync();
            if (steps == null)
            {
                return NotFound();
            }
            foreach (var step in steps)
            {
                procedure.Steps.Add(step);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
