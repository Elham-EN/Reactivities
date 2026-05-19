
using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities.Queries;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly AppDbContext context;
        private readonly IMediator mediator;

        public ActivitiesController(AppDbContext context, IMediator mediator)
        {
            this.context = context;
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await this.mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivitiesDetail(string id)
        {
            // A query is made to the database for an entity with the given 
            // primary key values. If not entity then return null
            var activity = await this.context.Activities.FindAsync(id);

            if (activity == null) return NotFound();

            return activity;
        }
    }
}