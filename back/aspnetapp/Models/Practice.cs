using Microsoft.AspNetCore.Identity;

namespace aspnetapp.Models;

public class Practice
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
    public string? Observations { get; set; }
    public int Duration { get; set; }
    public int ProcedureId { get; set; }
    public int StepId { get; set; }
    public string? UserId { get; set; } = null!;
    public bool IsFinished { get; set; } = false;

}