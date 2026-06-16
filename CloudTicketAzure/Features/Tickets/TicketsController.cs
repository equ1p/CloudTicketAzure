using CloudTicketAzure.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CloudTicketAzure.Features.Tickets;
[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly TicketService _ticketService;
    private readonly ApplicationDbContext _context;

    public TicketsController(TicketService ticketService, ApplicationDbContext context)
    {
        _ticketService = ticketService;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tickets = await _context.Tickets
            .Select(t => new
            {
                t.Id,
                t.EventName,
                t.Price,
                t.IsSold,
                t.UserId
            })
            .ToListAsync();
        return Ok(tickets);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var ticket = await _context.Tickets
            .Where(t => t.Id == id)
            .Select(t => new
            {
                t.Id,
                t.EventName,
                t.Price,
                t.IsSold,
                BuyerName = t.User != null ? t.User.Name : null
            })
            .FirstOrDefaultAsync();

        if (ticket is null)
            return NotFound(new { error = "Ticket not found." });

        return Ok(ticket);
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