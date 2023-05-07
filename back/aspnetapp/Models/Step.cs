namespace aspnetapp.Models
{
    public class Step
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string duration { get; set; } = null!;

        public Boolean? PreviousStep { get; set; }
        public virtual ICollection<ProcedureStep>? Procedures { get; set; }

        public virtual ICollection<Tool>? Tools { get; set; }

        public virtual ICollection<Practice>? Practices { get; set;} = new List<Practice>();
    }
}