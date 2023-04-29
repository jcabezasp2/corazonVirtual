using System.ComponentModel.DataAnnotations;


namespace aspnetapp.Models
{
    public class UserRole
    {
        [Required]
        public string UserEmail { get; set; }

        [Required]
        public string RoleName { get; set; }
    }
}