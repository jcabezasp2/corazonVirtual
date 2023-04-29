namespace aspnetapp.Models
{
    public class ApplicationUser : Microsoft.AspNetCore.Identity.IdentityUser
    {
        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Photo { get; set; }

    }
}