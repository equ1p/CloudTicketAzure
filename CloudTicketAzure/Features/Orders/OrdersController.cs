using CloudTicketAzure.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CloudTicketAzure.Features.Orders;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetByUser([FromQuery] Guid userId)
    {
        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.Ticket)
            .OrderByDescending(o => o.PurchaseDate)
            .Select(o => new
            {
                o.Id,
                o.TicketId,
                o.PurchaseDate,
                o.TotalAmount,
                EventName = o.Ticket.EventName
            })
            .ToListAsync();
        return Ok(orders);
    }
}