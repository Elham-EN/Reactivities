
using Domain;

namespace Persistence
{
    // Seeding data to the database
    public class DbInitializer
    {
        public static async Task SeedData(AppDbContext context)
        {
            // Check if there are any acitivities already in database
            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new() {
                    Title = "Wimbledon Championships 2026",
                    Date = new DateTime(2026, 6, 29, 11, 0, 0, DateTimeKind.Utc),
                    Description = "The world's oldest and most prestigious tennis tournament returns to the All England Club. Watch top-ranked players compete on the iconic grass courts.",
                    Category = "sport",
                    City = "London",
                    Venue = "All England Lawn Tennis Club, Church Road, Wimbledon, London, SW19 5AG",
                    Latitude = 51.4344,
                    Longitude = -0.2136
                },
                new() {
                    Title = "Glastonbury Festival 2026",
                    Date = new DateTime(2026, 6, 24, 12, 0, 0, DateTimeKind.Utc),
                    Description = "The world's most famous outdoor music and performing arts festival, featuring hundreds of artists across multiple stages.",
                    Category = "music",
                    City = "Pilton",
                    Venue = "Worthy Farm, Pilton, Shepton Mallet, Somerset, BA4 4BY",
                    Latitude = 51.1537,
                    Longitude = -2.5870
                },
                new() {
                    Title = "Edinburgh Fringe Festival 2026",
                    Date = new DateTime(2026, 8, 7, 10, 0, 0, DateTimeKind.Utc),
                    Description = "The world's largest arts festival, featuring thousands of performances including theatre, comedy, dance, and circus across hundreds of venues.",
                    Category = "culture",
                    City = "Edinburgh",
                    Venue = "Edinburgh City Centre, Edinburgh, Scotland, EH1 1YZ",
                    Latitude = 55.9533,
                    Longitude = -3.1883
                },
                new() {
                    Title = "Oktoberfest Munich 2026",
                    Date = new DateTime(2026, 9, 19, 9, 0, 0, DateTimeKind.Utc),
                    Description = "The world's largest beer festival and travelling funfair, held annually in Munich, Bavaria, Germany. Enjoy traditional Bavarian food, music, and beer.",
                    Category = "drinks",
                    City = "Munich",
                    Venue = "Theresienwiese, Theresienhöhe, Munich, Bavaria, 80339, Germany",
                    Latitude = 48.1315,
                    Longitude = 11.5492
                },
                new() {
                    Title = "Paris Marathon 2026",
                    Date = new DateTime(2026, 4, 5, 8, 0, 0, DateTimeKind.Utc),
                    Description = "One of the world's most scenic marathons, passing iconic landmarks including the Eiffel Tower, the Louvre, and the Champs-Élysées.",
                    Category = "sport",
                    City = "Paris",
                    Venue = "Champs-Élysées, 8th Arrondissement, Paris, Ile-de-France, 75008, France",
                    Latitude = 48.8698,
                    Longitude = 2.3078
                },
                new() {
                    Title = "Cannes Film Festival 2026",
                    Date = new DateTime(2026, 5, 13, 10, 0, 0, DateTimeKind.Utc),
                    Description = "One of the world's most prestigious film festivals, celebrating international cinema with screenings, premieres, and the coveted Palme d'Or award.",
                    Category = "film",
                    City = "Cannes",
                    Venue = "Palais des Festivals et des Congrès, 1 Boulevard de la Croisette, Cannes, 06400, France",
                    Latitude = 43.5508,
                    Longitude = 7.0175
                },
                new() {
                    Title = "Amsterdam Dance Event 2026",
                    Date = new DateTime(2026, 10, 14, 18, 0, 0, DateTimeKind.Utc),
                    Description = "The world's leading electronic music conference and festival, featuring over 2,500 artists performing across 200 venues in Amsterdam.",
                    Category = "music",
                    City = "Amsterdam",
                    Venue = "Melkweg, Lijnbaansgracht 234a, Amsterdam, Noord-Holland, 1017 PH, Netherlands",
                    Latitude = 52.3643,
                    Longitude = 4.8830
                },
                new() {
                    Title = "New York Food & Wine Festival 2026",
                    Date = new DateTime(2026, 10, 16, 11, 0, 0, DateTimeKind.Utc),
                    Description = "A four-day culinary extravaganza celebrating the best in food and wine, featuring world-renowned chefs, tastings, and cooking demonstrations.",
                    Category = "food",
                    City = "New York",
                    Venue = "Pier 92 & 94, 711 12th Avenue, New York, NY 10019, United States",
                    Latitude = 40.7666,
                    Longitude = -74.0005
                }
            };

            context.Activities.AddRange(activities);
            await context.SaveChangesAsync();
        }
    }
}
