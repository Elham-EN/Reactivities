
using AutoMapper;
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
            private readonly IMapper mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task Handle(Command request, 
                CancellationToken cancellationToken)
            {
                // It does not only return the activity but it tracks it (changes)
                var activity = await this.context.Activities
                    .FindAsync([request.Activity.Id], cancellationToken);

                if (activity == null)
                {
                    throw new Exception("Cannot find activity");
                }

                // Automatically copies matching properties from source to destination 
                mapper.Map(request.Activity, activity);

                // EF Core sees the diff and runs UPDATE
                await context.SaveChangesAsync(cancellationToken);
            }
        } 
    }
}