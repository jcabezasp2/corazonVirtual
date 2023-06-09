using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace aspnetapp.Models
{
    public class User
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;

        public string? Id { get; internal set; }


         public virtual ICollection<ApplicationUser>? Users { get; set; }

         
    }
}
