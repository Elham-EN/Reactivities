using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    private readonly ILogger<ExceptionMiddleware> logger;

    private readonly IHostEnvironment env;

    public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        this.logger = logger;
        this.env = env;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }

    private static async Task HandleValidationException(HttpContext context, 
        ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                // property already exists — append new error to existing ones
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = existingErrors
                        .Append(error.ErrorMessage)
                        .ToArray();
                }
                // property seen for first time — add it
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }
        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation error",
            Detail = "One or more validation errors has occured"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);

        
        // without it, ASP.NET Core would return its own ugly default 500 HTML page, which Axios 
        // can't parse as JSON. The middleware ensures the React client always gets a consistent 
        // JSON shape back
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        // Converts the value of a type specified by a generic type parameter into a JSON string
        var json = JsonSerializer.Serialize(response, options);

        // Writes the given text to the response body
        await context.Response.WriteAsync(json);
    }
}

// ex.Errors is a collection of ValidationFailure objects
// [
//   { PropertyName: "ActivityDto.Title",  ErrorMessage: "Title is required" },
//   { PropertyName: "ActivityDto.City",   ErrorMessage: "Please specify the city..." }
// ]