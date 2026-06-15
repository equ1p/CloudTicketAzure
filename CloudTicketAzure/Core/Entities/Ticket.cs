namespace CloudTicketAzure.Core.Entities
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string EventName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool isSold { get; set; }
        public Guid? UserId { get; set; }
        public byte[] RowVersion { get; set; } = null!;
        public User? User { get; set; }
        public Order? Order { get; set; }
    }
}
