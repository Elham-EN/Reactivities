
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly AppDbContext context;

            public Handler(AppDbContext context) {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities
                    .FindAsync([request.Id], cancellationToken);

                if (activity == null)
                {
                    return Result<Unit>.Failure("Activitiy not found", 404);
                }

                this.context.Remove(activity);

                var result = await this.context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to delete the activity", 400);
                }

                // when a command succeeds but has no value to return
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}