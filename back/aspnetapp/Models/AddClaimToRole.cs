using System.ComponentModel.DataAnnotations;

namespace aspnetapp.Models
{
    public class AddClaimToRole
    {
        [Required]
        public string RoleId { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Value { get; set; }
    }
}