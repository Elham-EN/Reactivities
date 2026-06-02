namespace Domain
{
    // Entity class relate to a table in the database
    public class Activity
    {
        // Default value initializer, so every time you do new Activity() it 
        // automatically generates a unique ID. You never have to set it manually.
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Title { get; set; }
        public DateTime Date { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public bool IsCancelled { get; set; }

        // Location props
        public required string City { get; set; }
        public required string Venue { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}