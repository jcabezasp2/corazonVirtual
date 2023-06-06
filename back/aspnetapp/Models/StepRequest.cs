namespace aspnetapp.Models
{
    public class StepRequest
    {
        public string name { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public string duration { get; set; }
        public Boolean previousStep { get; set; }
        public int[] tools { get; set; }
    }
}