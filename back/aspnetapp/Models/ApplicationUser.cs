namespace aspnetapp.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Photo { get; set; }

        public int UserId { get; set; }

    }
}