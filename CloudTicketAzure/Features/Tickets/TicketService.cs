using System.Text.Json;
using CloudTicketAzure.Core.Entities;
using CloudTicketAzure.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CloudTicketAzure.Features.Tickets;

public class TicketService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<TicketService> _logger;

    public TicketService(ApplicationDbContext context, ILogger<TicketService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(BuyTicketResponse? Response, string? Error, int StatusCode)> BuyTicketAsync(BuyTicketRequest request)
    {
        var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == request.TicketId);

        if (ticket is null)
            return (null, "Ticket not found.", 404);

        if (ticket.IsSold)
            return (null, "Ticket has already been sold.", 409);

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);

        if (user is null)
            return (null, "User not found.", 404);

        ticket.IsSold = true;
        ticket.UserId = request.UserId;

        var order = new Order
        {
            Id = Guid.NewGuid(),
            TicketId = ticket.Id,
            UserId = request.UserId,
            PurchaseDate = DateTime.UtcNow,
            TotalAmount = ticket.Price
        };
        _context.Orders.Add(order);

        var outboxMessage = new OutboxMessage
        {
            Id = Guid.NewGuid(),
            Type = "TicketPurchasedEvent",
            Content = JsonSerializer.Serialize(new
            {
                OrderId = order.Id,
                TicketId = ticket.Id,
                UserEmail = user.Email,
                EventName = ticket.EventName,
                TotalAmount = ticket.Price
            }),
            OccurredOn = DateTime.UtcNow
        };
        _context.OutboxMessages.Add(outboxMessage);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            _logger.LogWarning(
                "Concurrency conflict: ticket {TicketId} was already purchased by another user.",
                ticket.Id);

            return (null, "This ticket was just purchased by another user. Please try a different one.", 409);
        }

        var response = new BuyTicketResponse
        {
            OrderId = order.Id,
            TicketId = ticket.Id,
            EventName = ticket.EventName,
            TotalAmount = order.TotalAmount,
            PurchaseDate = order.PurchaseDate,
            Message = "Ticket purchased successfully! You will receive a confirmation email shortly."
        };

        return (response, null, 200);
    }
}
