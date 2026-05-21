
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext context;

            public Handler(AppDbContext context)
            {
                this.context = context;
            }

            public async Task Handle(Command request, 
                CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities
                    .FindAsync([request.Activity.Id], cancellationToken);

                if (activity == null)
                {
                    throw new Exception("Cannot find activity");
                }

                activity.Title = request.Activity.Title;

                await context.SaveChangesAsync(cancellationToken);

            }
        } 
    }
}