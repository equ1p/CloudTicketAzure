namespace CloudTicketAzure.Core.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
