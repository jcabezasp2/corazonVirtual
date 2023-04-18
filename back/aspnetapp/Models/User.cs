using System.ComponentModel.DataAnnotations;

namespace aspnetapp.Models
{
    public class User
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
    }
}