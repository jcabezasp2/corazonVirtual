namespace aspnetapp.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Photo { get; set; }

        public int UserId { get; set; }

        public virtual User? User { get; set; }

         public virtual ICollection<Practice>? Practices { get; set;}
    }
}
