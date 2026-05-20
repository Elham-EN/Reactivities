using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Activity>
        {
            // Need to know what the id is of the activity 
            // that need to be returned
            public required string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly AppDbContext context;

            public Handler(AppDbContext context)
            {
                this.context = context;
            }

            public async Task<Activity> Handle(Query request, 
                CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities
                    .FindAsync([request.Id], cancellationToken);
                
                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }

                return activity;
            }
        }
    }
}