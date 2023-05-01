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

        [Authorize(AuthenticationSchemes = $"{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme},ApiKey")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tool>>> GetTools()
        {
            if (_context.Tools == null)
            {
                return NotFound();
            }

            var tools = await _context.Tools.ToListAsync();

            return tools;
        }
    }
}