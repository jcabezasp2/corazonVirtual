using System.ComponentModel.DataAnnotations;

namespace aspnetapp.Models
{
    public class AddClaimToUSer
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Value { get; set; }
    }
}