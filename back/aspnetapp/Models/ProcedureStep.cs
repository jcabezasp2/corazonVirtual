namespace aspnetapp.Models;

public class ProcedureStep
{
    public int Id { get; set; }
    public int ProcedureId { get; set; }
    public int StepId { get; set; }
    public int Order { get; set; }
}