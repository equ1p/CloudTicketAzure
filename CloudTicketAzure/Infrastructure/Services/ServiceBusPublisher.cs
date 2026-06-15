using Azure.Messaging.ServiceBus;
using CloudTicketAzure.Core.Interfaces;

namespace CloudTicketAzure.Infrastructure.Services
{
    public class ServiceBusPublisher : IServiceBusPublisher
    {
        private readonly ServiceBusSender _sender;

        public ServiceBusPublisher(ServiceBusClient serviceBusClient)
        {
            _sender = serviceBusClient.CreateSender("email-queue");
        }

        public async Task PublishAsync(string messageBody, string messageType)
        {
            var message = new ServiceBusMessage(messageBody)
            {
                ContentType = "application/json",
                Subject = messageType,
                MessageId = Guid.NewGuid().ToString()
            };

            await _sender.SendMessageAsync(message);
        }
    }
}
