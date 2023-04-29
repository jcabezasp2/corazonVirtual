using System.ComponentModel.DataAnnotations;


namespace aspnetapp.Models
{
    public class UserData
    {

        public string Name { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }
        public ICollection<System.Security.Claims.Claim> RoleClaims { get; set; }

    }
}