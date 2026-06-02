using Application.Activities.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
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
            public required CreateActivityDto ActivityDto { get; set; }
        }

        // Handler — the business logic
        public class Handler : IRequestHandler<Command, string>
        {
            private readonly AppDbContext context;
            private readonly IMapper mapper;
            private readonly IValidator<Command> validator;

            public Handler(AppDbContext context, IMapper mapper, IValidator<Command> validator)
            {
                this.context = context;
                this.mapper = mapper;
                this.validator = validator;
            }
            // Mutate the DB, add the new Activity record to the database
            public async Task<string> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                // Validate the incoming DTO
                await validator.ValidateAndThrowAsync(request, cancellationToken);

                // Convert the incoming DTO into a Domain.Activity entity
                var activity = mapper.Map<Activity>(request.ActivityDto);

                // Save it to the database
                this.context.Activities.Add(activity);
                await this.context.SaveChangesAsync(cancellationToken);

                // Returns the generated ID back to the caller (the controller)
                return activity.Id;
            }
        }
    }
}