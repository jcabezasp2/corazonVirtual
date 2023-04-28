using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetapp.Models;

namespace aspnetapp.Controllers
{
    [Route("procedures")]
    [ApiController]
    public class ProcedureStepController : ControllerBase
    {
        private readonly dataContext _context;

        public ProcedureStepController(dataContext context)
        {
            _context = context;
        }

        // GET: Procedures/5/Steps
        [HttpGet("{procedureId}/Steps")]
        public async Task<ActionResult<IEnumerable<Step>>> GetSteps(int procedureId)
        {
            var procedure = await _context.Procedures.FindAsync(procedureId);

            if (procedure == null)
            {
                return NotFound();
            }
            var procedureSteps = await _context.ProcedureSteps.Where(ps => ps.ProcedureId == procedureId).ToListAsync();
            
            var Steps = new List<Step>();

            foreach (var procedureStep in procedureSteps)
            {
                var step = await _context.Steps.FindAsync(procedureStep.StepId);
                if (step == null)
                {
                    return NotFound();
                }
                Steps.Add(step);
            }

            if (Steps == null)
            {
                return NotFound();
            }

            return Steps;
        }

        // POST Procedures/5/Steps
        [HttpPost("{procedureId}/steps")]
        public async Task<ActionResult<ProcedureStep>> PostProcedureStep(int procedureId, int[] stepIds)
        {
            var procedure = await _context.Procedures.FindAsync(procedureId);
            if (procedure == null)
            {
                return NotFound();
            }
            foreach (var stepId in stepIds)
            {
                var step = await _context.Steps.FindAsync(stepId);
                if (step == null)
                {
                    return NotFound();
                }
                var procedureStep = new ProcedureStep { ProcedureId = procedureId, StepId = stepId };
                _context.ProcedureSteps.Add(procedureStep);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE Procedures/5/Steps
        [HttpDelete("{procedureId}/steps")]
        public async Task<IActionResult> DeleteProcedureStep(int procedureId, int[] stepIds)
        {
            var procedure = await _context.Procedures.FindAsync(procedureId);
            if (procedure == null)
            {
                return NotFound();
            }
            foreach (var stepId in stepIds)
            {
                var step = await _context.Steps.FindAsync(stepId);
                if (step == null)
                {
                    return NotFound();
                }
                var procedureStep = await _context.ProcedureSteps.FindAsync(procedureId, stepId);
                if (procedureStep == null)
                {
                    return NotFound();
                }
                _context.ProcedureSteps.Remove(procedureStep);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }

        // PUT Procedures/5/Steps
        [HttpPut("{procedureId}/steps")]
        public async Task<IActionResult> PutProcedureStep(int procedureId, int[] stepIds)
        {
            var procedure = await _context.Procedures.FindAsync(procedureId);
            if (procedure == null)
            {
                return NotFound();
            }
            var procedureSteps = await _context.ProcedureSteps.Where(ps => ps.ProcedureId == procedureId).ToListAsync();
            foreach (var procedureStep in procedureSteps)
            {
                _context.ProcedureSteps.Remove(procedureStep);
            }
            await _context.SaveChangesAsync();
            foreach (var stepId in stepIds)
            {
                var step = await _context.Steps.FindAsync(stepId);
                if (step == null)
                {
                    return NotFound();
                }
                var procedureStep = new ProcedureStep { ProcedureId = procedureId, StepId = stepId };
                _context.ProcedureSteps.Add(procedureStep);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}