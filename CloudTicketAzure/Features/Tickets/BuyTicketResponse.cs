namespace CloudTicketAzure.Features.Tickets;

public class BuyTicketResponse
{
    public Guid OrderId { get; set; }
    public Guid TicketId { get; set; }
    public string EventName { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public DateTime PurchaseDate { get; set; }
    public string Message { get; set; } = string.Empty;
}
