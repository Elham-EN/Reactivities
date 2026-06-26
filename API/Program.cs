using API.Middleware;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddMediatR(cfg =>
{
    cfg.LicenseKey = builder.Configuration["MediatR:LicenseKey"];
    cfg.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    // MediatR picks it up automatically as a pipeline behavior for every mediator.Send(...)
    //  It runs between the Send and the actual handler.
    cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = builder.Configuration["MediatR:LicenseKey"];
}, typeof(MappingProfiles).Assembly);
// registers every class that extends AbstractValidator<T> into DI automatically.
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
// middleware should be stateless and a fresh instance per request
builder.Services.AddTransient<ExceptionMiddleware>();
// Activate Identity APIs
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => 
    x.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000")
);

// First need to authentication user
app.UseAuthentication();
// Then authorize user what they are allow to do
app.UseAuthorization();

app.MapControllers();

// Map the Identity endpoints api/login
app.MapGroup("api").MapIdentityApi<User>();

// The scope runs before app.Run() — it's not part of the request pipeline 
// at all. It executes once at startup: Then it disposes
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    // Give us Access to the Database instance
    var context = services.GetRequiredService<AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

// The starting point for incoming requests is app.Run(). Everything before it 
// (service registration, middleware, seed data) has already executed by that point.
app.Run();
