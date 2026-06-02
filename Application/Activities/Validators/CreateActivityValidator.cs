using Application.Activities.Commands;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto.Title)
            .NotEmpty()
            .WithMessage("Please give your activity a title so others know what it's about.")
            .MaximumLength(100)
            .WithMessage("Title must be 100 characters or fewer.");
        
        RuleFor(x => x.ActivityDto.Description)
            .NotEmpty()
            .WithMessage("A short description helps attendees understand what to expect.")
            .MaximumLength(1000)
            .WithMessage("Description must be 1000 characters or fewer.");
    }
}