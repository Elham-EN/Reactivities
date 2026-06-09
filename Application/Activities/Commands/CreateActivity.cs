using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
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
        public class Command : IRequest<Result<string>>
        {
            // Enforces that you must set it when constructing the Command
            public required CreateActivityDto ActivityDto { get; set; }
        }

        // Handler — the business logic
        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly AppDbContext context;
            private readonly IMapper mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            // Mutate the DB, add the new Activity record to the database
            public async Task<Result<string>> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                // Convert the incoming DTO into a Domain.Activity entity
                var activity = mapper.Map<Activity>(request.ActivityDto);

                // Save it to the database
                this.context.Activities.Add(activity);

                var result = await this.context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<string>.Failure("Failed to update the activity", 400);
                }

                // Returns the generated ID back to the caller (the controller)
                return Result<string>.Success(activity.Id);
            }
        }
    }
}