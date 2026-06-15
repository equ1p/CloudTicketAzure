using System.Text.Json;
using CloudTicketAzure.Core.Entities;
using CloudTicketAzure.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CloudTicketAzure.Features.Tickets
{
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
                return (null, "Ticket was already sold.", 409);

            var userExists = await _context.Users.AnyAsync(u => u.Id == request.UsierId);

            if (!userExists)
                return (null, "User not found.", 404);

            ticket.IsSold = true;
            ticket.UserId = request.UsierId;

            var order = new Order
            {
                Id = Guid.NewGuid(),
                TicketId = ticket.Id,
                UserId = request.UsierId,
                PurchaseDate = DateTime.Now,
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
                    UserEmail = "user@example.com",
                    EventName = ticket.EventName,
                    TotalAmount = ticket.Price
                }),
                OccuredOn = DateTime.UtcNow
            };
            _context.OutboxMessages.Add(outboxMessage);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                _logger.LogWarning(
                    "Concurrency conflict: ticket {TicketId} has already been bought by another user",
                    ticket.Id);

                return (null, "The ticket has been bought by another user. Try another one.", 409);
            }

            var response = new BuyTicketResponse
            {
                OrderId = order.Id,
                TicketId = ticket.Id,
                EventName = ticket.EventName,
                TotalAmount = order.TotalAmount,
                PurchaseDate = order.PurchaseDate,
                Message = "Ticket successfully bought! You will receive it by email as soon as possible."
            };

            return (response, null, 200);
        }
    }
}
