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

        // GET: api/Procedures
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Procedure>>> GetProcedures()
        {
          if (_context.Procedures == null)
          {
              return NotFound();
          }
            return await _context.Procedures.ToListAsync();
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
