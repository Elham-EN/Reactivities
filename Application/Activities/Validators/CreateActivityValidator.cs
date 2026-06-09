using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace Application.Activities.Validators;

public class CreateActivityValidator
    // it tells BaseActivityValidator "to get the DTO out of the command, 
    // navigate to .ActivityDto"
    : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto) { }
}
