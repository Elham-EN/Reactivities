
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        // Provides lazy access to IMediator via the Mediator property — 
        // so any controller that inherits from it can call await 
        // Mediator.Send(...) without having to inject IMediator through 
        // the constructor in every single controller.
        private IMediator? _mediator;

        protected IMediator Mediator
        {
            get
            {
                if (_mediator == null)
                {
                    // Asks the DI service container "give me the registered IMediator instance
                    // HttpContext - the current HTTP request context
                    _mediator = HttpContext.RequestServices.GetService<IMediator>()
                        ?? throw new InvalidOperationException(
                            "IMediator service is unavailable");
                }
                return _mediator;
            }
        }

        protected ActionResult<T> HandlerResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.Code == 404) return NotFound();

            if (result.IsSuccess && result.Value != null) return result.Value;

            return BadRequest(result.Error);
        }
    }
}