using FluentValidation;
using MediatR;

namespace Application.Core;


// A pipeline middleware for MediatR. Everytime send a command/query via 'mediator.Send',
// MediaR runs it through the pipeline nefore reaching the actual handler
// mediator.Send(command)
    // → ValidationBehavior  ← runs validation here automatically
        // → actual Handler
// becomes this at runtime for a create command:
// ValidationBehavior<CreateActivity.Command, string>
public class ValidationBehavior<TRequest, TResponse> 
// the request object can't be null.
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    private readonly IValidator<TRequest> validator;

    // DI will now pass null when no validator is registered
    public ValidationBehavior(IValidator<TRequest> validator = null!)
    {
        // For CreateActivity.Command → DI finds CreateActivityValidator registered, 
        // so this.validator holds that validator instance
        // For GetActivityList.Query → no validator registered, so DI now passes null
        this.validator = validator;
    }

    public async Task<TResponse> Handle(TRequest request, 
        RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        // If no validator exists for this request, skip validation
        if (validator == null) return await next(cancellationToken);

        //  Runs all the validation rules against the request object and stores the result 
        // (pass/fail + any error messages) in validationResult.
        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        return await next(cancellationToken);
    }
}

// E.g.
// CreateActivity.Command sent
//   → DI injects CreateActivityValidator as validator
//   → ValidationBehavior runs validator.ValidateAsync(request)
//   → checks the rules you defined in CreateActivityValidator
// If TRequest is a query that has no validator class registered, validator will be null.