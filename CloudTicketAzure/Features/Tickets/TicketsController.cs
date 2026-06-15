using Microsoft.AspNetCore.Mvc;

namespace CloudTicketAzure.Features.Tickets;
[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly TicketService _ticketService;

    public TicketsController(TicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpPost("buy")]
    public async Task<IActionResult> BuyTicket([FromBody] BuyTicketRequest request)
    {
        var (response, error, statusCode) = await _ticketService.BuyTicketAsync(request);

        if (response is not null)
            return Ok(response);

        return StatusCode(statusCode, new { error });
    }
}