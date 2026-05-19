using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    // Two MediatR contracts that together form a CQRS query pipeline
    // You reference it as GetActivityList.Query & GetActivity.Handler
    public class GetActivityList
    {
        // Query — the message (the "what do you want?")
        // which tells MediatR: when someone sends this object 'Query', expect 
        // a List<Activity> back. (Tell you what the return type is)
        public class Query : IRequest<List<Activity>> {}
        // Handler — the logic (the "here's how to do it")
        // which means: I know how to handle a GetActivityList.Query and 
        // I'll return a List<Activity> back as the response
        public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
        {
            // Call DB to get back list of activities (entities).
            public async Task<List<Activity>> Handle(Query request, 
                CancellationToken cancellationToken)
            {
                // Pass cancellationToken to EF Core if the request is cancelled, 
                // the db query stops immediately instead of wasting resources
                return await context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}