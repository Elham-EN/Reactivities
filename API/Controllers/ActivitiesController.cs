
using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly AppDbContext context;

        public ActivitiesController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivititDetail(string id)
        {
            // A query is made to the database for an entity with the given 
            // primary key values. If not entity then return null
            var activity = await this.context.Activities.FindAsync(id);

            if (activity == null) return NotFound();

            return activity;
        }
    }
}