namespace aspnetapp.Models;

public class Procedure
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Image { get; set; }

    public List<Step> Steps { get; set; } = null!;
}