namespace aspnetapp.Models
{
    public class Step
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string duration { get; set; } = null!;
        public List<Procedure> Procedures { get; set; } = null!;
    }
}