using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    // CQRS Command responsible for creating a new activity (mutates DB)
    public class CreateActivity
    {
        // Command — the input message: Carries the full Activity object 
        // that the controller received from the HTTP request body
        public class Command : IRequest<string>
        {
            // Enforces that you must set it when constructing the Command
            public required Activity Activity { get; set; }
        }

        // Handler — the business logic
        public class Handler : IRequestHandler<Command, string>
        {
            private readonly AppDbContext context;

            public Handler(AppDbContext context)
            {
                this.context = context;
            }
            // Mutate the DB, add the new Activity record to the database
            public async Task<string> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                // Override user provided id
                request.Activity.Id = Guid.NewGuid().ToString();

                this.context.Activities.Add(request.Activity);

                await this.context.SaveChangesAsync(cancellationToken);

                // Returns the generated ID back to the caller (the controller)
                return request.Activity.Id;
            }
        }
    }
}