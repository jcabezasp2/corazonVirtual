using System.ComponentModel.DataAnnotations;


namespace aspnetapp.Models
{
public class Tool
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public String Modelo3D { get; set; }
    

}

}
