namespace aspnetapp.Models;


public class Procedure
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string? Image { get; set; }

    public virtual ICollection<Step>? Steps { get; set;} = new List<Step>();

    public virtual ICollection<Practice>? Practices { get; set;} = new List<Practice>();
}