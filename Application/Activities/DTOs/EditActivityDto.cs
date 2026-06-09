namespace Application.Activities.DTOs;

public class EditActivityDto : BaseActivityDto
{
    // Id to identify which activity to update.
    public string Id { get; set; } = "";
}