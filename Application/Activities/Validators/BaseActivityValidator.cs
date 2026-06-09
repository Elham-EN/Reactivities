using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T>
    // Tells the compiler "TDto must be or inherit from BaseActivityDto."
    // TDto must pass a type that is BaseActivityDto or inherits from it.
    where TDto : BaseActivityDto
{
    // A delegate — a type that represents a method: a function that takes a T and returns a TDto
    // In CreateActivityValidator constructor's base(x => x.ActivityDto). That lambda 
    // x => x.ActivityDto is the Func<T, TDto> — it takes a CreateActivity.Command (T) and returns 
    // a CreateActivityDto (TDto). when you write: RuleFor(x => selector(x).Title) selector(x) calls 
    // that function — it takes the command x and navigates to .ActivityDto, then .Title is accessed 
    // on it.
    public BaseActivityValidator(Func<T, TDto> selector)
    {
    
        RuleFor(x => selector(x).Title)
            .NotEmpty().WithMessage("Please give your activity a title so others know what it's about.")
            .MaximumLength(100).WithMessage("Title must be 100 characters or fewer.");

        RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage("A short description helps attendees understand what to expect.")
            .MaximumLength(1000).WithMessage("Description must be 1000 characters or fewer.");

        RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage("Please select a category for your activity.")
            .MaximumLength(50).WithMessage("Category must be 50 characters or fewer.");

        RuleFor(x => selector(x).City)
            .NotEmpty().WithMessage("Please specify the city where the activity will take place.")
            .MaximumLength(50).WithMessage("City must be 50 characters or fewer.");

        RuleFor(x => selector(x).Venue)
            .NotEmpty().WithMessage("Please provide a venue so attendees know where to go.")
            .MaximumLength(100).WithMessage("Venue must be 100 characters or fewer.");

        RuleFor(x => selector(x).Latitude)
            .NotEqual(0).WithMessage("Please provide a valid latitude.")
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90.");

        RuleFor(x => selector(x).Longitude)
            .NotEqual(0).WithMessage("Please provide a valid longitude.")
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180.");

        RuleFor(x => selector(x).Date)
            .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future");
    
    }
}
