namespace CloudTicketAzure.Core.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid TicketId { get; set; }
        public Guid UserId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal TotalAmount { get; set; }
        public Ticket Ticket { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
