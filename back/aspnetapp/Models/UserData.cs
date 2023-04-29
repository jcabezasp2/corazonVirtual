using System.ComponentModel.DataAnnotations;


namespace aspnetapp.Models
{
    public class UserData
    {
        public Microsoft.AspNetCore.Identity.IdentityUser user { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public ICollection<System.Security.Claims.Claim> RoleClaims { get; set; }

    }
}