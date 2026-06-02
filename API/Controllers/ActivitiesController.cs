
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities.Queries;
using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await this.Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetails(string id)
        {
            return await this.Mediator.Send(new GetActivityDetails.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(
            CreateActivityDto activityDto)
        {
            return await Mediator
                .Send(new CreateActivity.Command{ActivityDto = activityDto});
        }

        [HttpPut]
        public async Task<ActionResult> EditActivity(Activity activity)
        {
            await Mediator.Send(new EditActivity.Command{Activity = activity});

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            await this.Mediator.Send(new DeleteActivity.Command{Id = id});
            return Ok();
        }
    }
}