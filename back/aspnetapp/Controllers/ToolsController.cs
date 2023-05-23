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
    [Route("Herramientas")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
                private readonly dataContext _context;

        public ToolsController(dataContext context)
        {
            _context = context;
        }


         // GET: api/Tools
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tool>>> GetTools()
        {
            if (_context.Tools == null)
            {
                return NotFound();
            }
                return await _context.Tools.ToListAsync();
        }

        // GET: api/Tools/1
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
         

    // PUT: api/Tools/5
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTool(int id, Tool tool)
        {
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

        // POST: api/Tools
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpPost]
        public async Task<ActionResult<Tool>> PostTool(Tool tool)
        {
          if (_context.Tools == null)
          {
              return Problem("Entity set 'dataContext.Tools'  is null.");
          }
            _context.Tools.Add(tool);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTool", new { id = tool.Id }, tool);
        }

        // DELETE: api/Tools/5
        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTool(int id)
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

            _context.Tools.Remove(tool);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToolExists(int id)
        {
            return (_context.Tools?.Any(e => e.Id == id)).GetValueOrDefault();
        }



    }
 
 }
