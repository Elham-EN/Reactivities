
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext context;

            public Handler(AppDbContext context) {
                this.context = context;
            }

            public async Task Handle(Command request, 
                CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities
                    .FindAsync([request.Id], cancellationToken);

                if (activity == null)
                {
                    throw new Exception("Cannot find activity");
                }

                this.context.Remove(activity);

                await this.context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}