namespace CloudTicketAzure.Features.Tickets;

public class BuyTicketRequest
{
    public Guid TicketId { get; set; }
    public Guid UserId { get; set; }
}
