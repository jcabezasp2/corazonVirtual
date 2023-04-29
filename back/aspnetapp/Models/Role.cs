using System.ComponentModel.DataAnnotations;

namespace aspnetapp.Models
{
    public class Role
    {
        [Required]
        public string Name { get; set; }
    }
}