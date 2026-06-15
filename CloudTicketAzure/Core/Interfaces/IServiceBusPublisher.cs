namespace CloudTicketAzure.Core.Interfaces
{
    public interface IServiceBusPublisher
    {
        Task PublishAsync(string messageBody, string messageType);
    }
}
