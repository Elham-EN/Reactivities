
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    // Seeding data to the database
    public class DbInitializer
    {
        public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
        {
            // Check if there are any users already in database
            if(!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new() {DisplayName = "Bob", UserName = "bob@test.com", Email = "bob@test.com"},
                    new() {DisplayName = "Tom", UserName = "tom@test.com", Email = "tom@test.com"},
                    new() {DisplayName = "Sam", UserName = "sam@test.com", Email = "sam@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd123");
                }
            }

            // Check if there are any acitivities already in database
            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new() {
                    Title = "Wimbledon Championships 2026",
                    Date = new DateTime(2026, 6, 29, 11, 0, 0, DateTimeKind.Utc),
                    Description = "The Wimbledon Championships is the world's oldest and most prestigious tennis tournament, held annually at the All England Lawn Tennis and Croquet Club in Wimbledon, London. Founded in 1877, it is one of the four Grand Slam tennis tournaments and the only one still played on grass, the sport's original surface. The tournament draws the world's top-ranked players who compete across five categories: men's singles, women's singles, men's doubles, women's doubles, and mixed doubles. Fans flock from across the globe to witness thrilling matches on Centre Court, where a retractable roof ensures play continues in all weathers. The Championships are famous for their strict all-white dress code for players, the tradition of strawberries and cream, and the royal box where dignitaries and celebrities gather to watch the action. Queue culture is a beloved British tradition here — thousands of fans camp overnight for the chance to secure a ticket. The 2026 edition promises an extraordinary field of talent, with defending champions looking to retain their titles against a new generation of challengers hungry for glory on the iconic grass courts.",
                    Category = "sport",
                    City = "London",
                    Venue = "All England Lawn Tennis Club, Church Road, Wimbledon, London, SW19 5AG",
                    Latitude = 51.4344,
                    Longitude = -0.2136
                },
                new() {
                    Title = "Glastonbury Festival 2026",
                    Date = new DateTime(2026, 6, 24, 12, 0, 0, DateTimeKind.Utc),
                    Description = "Glastonbury Festival of Contemporary Performing Arts is the world's most famous outdoor music and performing arts festival, held on Worthy Farm in Pilton, Somerset, England. Founded by dairy farmer Michael Eavis in 1970, the festival has grown from a modest gathering of 1,500 people into a spectacular five-day event that welcomes over 200,000 attendees each year. The festival features hundreds of artists spanning every genre imaginable — from rock and pop to jazz, folk, electronic, world music, and everything in between — spread across dozens of stages including the iconic Pyramid Stage. Beyond music, Glastonbury is a cultural phenomenon, offering theatre, circus performances, comedy, art installations, healing fields, and a vast array of independent food vendors and market traders. The festival is renowned for its commitment to environmental sustainability and charitable causes, partnering with organisations like Oxfam, Greenpeace, and WaterAid. Whether you're watching a headline act as the sun sets over the Pyramid Stage or stumbling upon a hidden gem in one of the smaller tents, Glastonbury 2026 promises to be an unforgettable experience that defines the spirit of live music and community.",
                    Category = "music",
                    City = "Pilton",
                    Venue = "Worthy Farm, Pilton, Shepton Mallet, Somerset, BA4 4BY",
                    Latitude = 51.1537,
                    Longitude = -2.5870
                },
                new() {
                    Title = "Edinburgh Fringe Festival 2026",
                    Date = new DateTime(2026, 8, 7, 10, 0, 0, DateTimeKind.Utc),
                    Description = "The Edinburgh Festival Fringe is the world's largest arts festival, transforming the historic Scottish capital into a sprawling open-air stage every August. Born in 1947 when eight theatre companies turned up uninvited to the Edinburgh International Festival and performed on the fringes, the event has since grown to encompass thousands of performances by artists from over 60 countries. Over the course of three weeks, the city's streets, venues, churches, pubs, and car parks become home to an extraordinary breadth of performance — theatre, comedy, dance, physical theatre, musical theatre, opera, cabaret, spoken word, and circus arts all have a place at the Fringe. The Royal Mile transforms into a carnival atmosphere as performers hand out flyers, street artists captivate passersby, and audiences hop from venue to venue in search of their next discovery. It is a festival built on the democratic principle that anyone can perform — there is no selection committee, no gatekeeping. This openness has given rise to countless careers; many of today's biggest names in comedy and theatre got their first big break on the Edinburgh Fringe stage. In 2026, over 3,000 shows are expected across more than 300 venues, making it an unmissable celebration of human creativity and expression.",
                    Category = "culture",
                    City = "Edinburgh",
                    Venue = "Edinburgh City Centre, Edinburgh, Scotland, EH1 1YZ",
                    Latitude = 55.9533,
                    Longitude = -3.1883
                },
                new() {
                    Title = "Oktoberfest Munich 2026",
                    Date = new DateTime(2026, 9, 19, 9, 0, 0, DateTimeKind.Utc),
                    Description = "Oktoberfest is the world's largest beer festival and travelling funfair, held annually on the Theresienwiese grounds in central Munich, Bavaria, Germany. The festival has its roots in the royal wedding celebrations of Crown Prince Ludwig and Princess Therese of Saxony-Hildburghausen in October 1810, and has since evolved into a 16- to 18-day folk festival that attracts over six million visitors from around the world each year. At the heart of the event are the grand beer tents, each operated by one of Munich's six traditional breweries — Augustiner, Hacker-Pschorr, Hofbräu, Löwenbräu, Paulaner, and Spaten — serving litres of specially brewed Märzen and Festbier to thirsty revellers. The atmosphere inside the tents is electric, with brass bands playing traditional Bavarian oompah music, crowds swaying in unison, and steins clinking in an endless toast to gemütlichkeit, the uniquely German sense of warmth and conviviality. Beyond the beer tents, the festival grounds feature an enormous funfair with rides, games, and stalls selling traditional Bavarian food including pretzels, roast chicken, grilled fish, and the famous Hendl. Visitors are encouraged to dress in traditional Bavarian costume — lederhosen for men and dirndls for women — adding to the festive and welcoming atmosphere.",
                    Category = "drinks",
                    City = "Munich",
                    Venue = "Theresienwiese, Theresienhöhe, Munich, Bavaria, 80339, Germany",
                    Latitude = 48.1315,
                    Longitude = 11.5492
                },
                new() {
                    Title = "Paris Marathon 2026",
                    Date = new DateTime(2026, 4, 5, 8, 0, 0, DateTimeKind.Utc),
                    Description = "The Paris Marathon is one of the world's most scenic and celebrated long-distance running events, attracting over 50,000 runners from more than 150 countries each spring. The 42.195-kilometre route winds through the heart of one of the most beautiful cities in the world, passing iconic landmarks that most visitors only ever see from a tourist bus. Runners set off from the Champs-Élysées, passing the Arc de Triomphe before heading east through the city's diverse arrondissements. The course takes participants past the Louvre, along the banks of the Seine, through the elegant Place de la Bastille, and into the leafy Bois de Vincennes before looping back through the Bois de Boulogne towards the finish line near Avenue Foch. Crowds line the streets throughout, offering encouragement in a dozen languages and creating an atmosphere of extraordinary energy and warmth. Whether you are a seasoned marathon runner chasing a personal best or a first-timer completing a lifelong ambition, the Paris Marathon offers an experience unlike any other. The 2026 edition is set to be particularly special, with enhanced crowd zones and entertainment along the route to celebrate the growing legacy of the event as one of the Abbott World Marathon Majors series.",
                    Category = "sport",
                    City = "Paris",
                    Venue = "Champs-Élysées, 8th Arrondissement, Paris, Ile-de-France, 75008, France",
                    Latitude = 48.8698,
                    Longitude = 2.3078
                },
                new() {
                    Title = "Cannes Film Festival 2026",
                    Date = new DateTime(2026, 5, 13, 10, 0, 0, DateTimeKind.Utc),
                    Description = "The Festival de Cannes is one of the world's most prestigious and influential film festivals, held annually on the French Riviera in the glamorous seaside city of Cannes. Since its inaugural edition in 1946, the festival has served as the global showcase for the art of cinema, celebrating both commercial blockbusters and daring independent films from every corner of the world. Over twelve days in May, the Palais des Festivals et des Congrès becomes the epicentre of the international film industry, hosting world premieres, press screenings, industry panels, and co-production markets that shape the future of filmmaking. The red carpet on the Croisette is one of the most photographed and recognisable in the world, with A-list stars, celebrated directors, and up-and-coming talent all ascending its famous steps. The festival's official competition programme culminates in the awards ceremony presided over by a jury of distinguished filmmakers, actors, and artists, with the coveted Palme d'Or awarded to the best film of the year. Past Palme d'Or winners include landmark films that have gone on to define cinema history. Beyond the main competition, Cannes hosts parallel sections including Un Certain Regard, the Directors' Fortnight, and the Critics' Week, ensuring a rich and diverse programme for cinephiles of all tastes.",
                    Category = "film",
                    City = "Cannes",
                    Venue = "Palais des Festivals et des Congrès, 1 Boulevard de la Croisette, Cannes, 06400, France",
                    Latitude = 43.5508,
                    Longitude = 7.0175
                },
                new() {
                    Title = "Amsterdam Dance Event 2026",
                    Date = new DateTime(2026, 10, 14, 18, 0, 0, DateTimeKind.Utc),
                    Description = "The Amsterdam Dance Event, widely known as ADE, is the world's leading electronic music conference and festival, transforming the Dutch capital into the global capital of dance music for five extraordinary days every October. Since its founding in 1996, ADE has grown from a small industry gathering into a sprawling multi-venue festival that sees over 2,500 artists perform across more than 200 venues throughout the city, from intimate underground clubs and repurposed warehouses to grand concert halls and open-air spaces along Amsterdam's famous canals. By day, the conference programme brings together thousands of industry professionals, artists, managers, labels, agents, and technology innovators for keynotes, panel discussions, workshops, and masterclasses that address the most pressing issues and exciting opportunities in the global music industry. By night, the city comes alive with a relentless schedule of parties and performances spanning every corner of the electronic music spectrum — from techno and house to drum and bass, ambient, experimental, and everything in between. ADE is a true meeting point for the global electronic music community, where legends of the scene share stages with emerging talent, and where the next generation of producers, DJs, and promoters discover the inspiration and connections that will shape their careers. The 2026 edition promises to be the most ambitious and diverse yet.",
                    Category = "music",
                    City = "Amsterdam",
                    Venue = "Melkweg, Lijnbaansgracht 234a, Amsterdam, Noord-Holland, 1017 PH, Netherlands",
                    Latitude = 52.3643,
                    Longitude = 4.8830
                },
                new() {
                    Title = "New York Food & Wine Festival 2026",
                    Date = new DateTime(2026, 10, 16, 11, 0, 0, DateTimeKind.Utc),
                    Description = "The New York City Wine & Food Festival is a four-day culinary extravaganza that celebrates the very best in food, wine, and the culture that surrounds them. Held each October against the spectacular backdrop of New York City, the festival brings together an extraordinary constellation of world-renowned chefs, winemakers, sommeliers, food writers, and culinary personalities for a packed programme of tastings, demonstrations, dinners, and parties that span the five boroughs. Founded in 2008 to benefit the Food Bank For New York City and No Kid Hungry, the festival has raised tens of millions of dollars for hunger relief while delivering unforgettable experiences to food lovers from around the world. Signature events include Grand Tastings at Pier 92 and 94, where hundreds of exhibitors pour wines and serve bites from some of the city's most celebrated restaurants, as well as intimate dinner series hosted by James Beard Award-winning chefs in their own kitchens and dining rooms. Cooking demonstrations, brunch events, burger and wine tastings, and late-night parties complete a programme that caters to every palate and budget. Whether you are a serious gastronome, a passionate home cook, or simply someone who loves great food and great company, the New York Food and Wine Festival 2026 is a once-a-year celebration not to be missed.",
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
