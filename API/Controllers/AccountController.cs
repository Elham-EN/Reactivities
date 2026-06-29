using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly SignInManager<User> signInManager;

    public AccountController(SignInManager<User> signInManager)
    {
        this.signInManager = signInManager;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
        };

        var result = await this.signInManager
            .UserManager
            .CreateAsync(user, registerDto.Password);

        if (result.Succeeded) return Ok();

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        } 

        // Send 400 BadRequest response with validation errors from ModelState
        return ValidationProblem();
    }

    // When you logged in, SignInManager.SignInAsync (called internally by the /login endpoint) 
    // encrypted a claims-based identity ticket — including the user's ID — into the 
    // .AspNetCore.Identity.Application cookie. Before your controller action even runs, the 
    // cookie authentication middleware reads that cookie from the incoming request, decrypts it, 
    // and reconstructs a ClaimsPrincipal. That gets attached to HttpContext.User — which is 
    // exactly the User property referenced.
    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        // If user is not authenticated send no content (No user info)
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }
        // Extracts the ID from those claims.
        var user = await this.signInManager.UserManager.GetUserAsync(User);

        if (user == null) return Unauthorized();


        return Ok(new
        {
            user.DisplayName,
            user.Email,
            user.Id,
            user.ImageUrl
        });
    }

    
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        // Also remove the cookie
        await this.signInManager.SignOutAsync();

        return NoContent();
    }
}