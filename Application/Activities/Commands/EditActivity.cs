
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly AppDbContext context;
            private readonly IMapper mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                // It does not only return the activity but it tracks it (changes)
                var activity = await this.context.Activities
                    .FindAsync([request.Activity.Id], cancellationToken);

                if (activity == null)
                {
                    return Result<Unit>.Failure("Activitiy not found", 404);
                }

                // Automatically copies matching properties from source to destination 
                mapper.Map(request.Activity, activity);

                // EF Core sees the diff and runs UPDATE
                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to update the activity", 400);
                }

                // when a command succeeds but has no value to return
                return Result<Unit>.Success(Unit.Value);
            }
        } 
    }
}