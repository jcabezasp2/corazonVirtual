using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace aspnetapp.Models
{
    [Index(nameof(Value), IsUnique = true)]
    public class UserApiKey
    {
        [JsonIgnore]
        public int ID { get; set; }

        [Required]
        public string Value { get; set; } = null!;

        [JsonIgnore]
        [Required]
        public string UserID { get; set; } = null!;

        [JsonIgnore]
        public IdentityUser User { get; set; } = null!;
    }
}