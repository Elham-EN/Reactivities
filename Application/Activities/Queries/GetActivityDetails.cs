using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Result<Activity>>
        {
            // Need to know what the id is of the activity 
            // that need to be returned
            public required string Id { get; set; }
        }

        // Result<Activity> is the return type — a wrapper around Activity 
        // that carries either a success value or an error
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly AppDbContext context;

            public Handler(AppDbContext context)
            {
                this.context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, 
                CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities
                    .FindAsync([request.Id], cancellationToken);
                
                if (activity == null)
                {
                    return Result<Activity>.Failure("Activity nott found", 404);
                }

                return Result<Activity>.Success(activity);
            }
        }
    }
}