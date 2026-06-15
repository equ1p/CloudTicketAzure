using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace CloudTicketAzure.Functions;

public class EmailSenderFunction
{
    private readonly ILogger<EmailSenderFunction> _logger;

    public EmailSenderFunction(ILogger<EmailSenderFunction> logger)
    {
        _logger = logger;
    }

    [Function("EmailSenderFunction")]
    public async Task Run(
        [ServiceBusTrigger("email-queue", Connection = "AzureServiceBusConnection")]
        string messageBody)
    {
        _logger.LogInformation("Received message from email-queue");

        try
        {
            var eventData = JsonSerializer.Deserialize<JsonElement>(messageBody);

            var orderId = eventData.GetProperty("OrderId").GetString();
            var userEmail = eventData.GetProperty("UserEmail").GetString();
            var eventName = eventData.GetProperty("EventName").GetString();
            var totalAmount = eventData.GetProperty("TotalAmount").GetDecimal();

            _logger.LogInformation(
                "PDF ticket is being generated for order {OrderId}", orderId);
            await Task.Delay(TimeSpan.FromSeconds(1));

            _logger.LogInformation(
                "Sending email to {Email}: " +
                "Ticket for {EventName}, amount {Amount:C}. " +
                "Order: {OrderId}",
                userEmail, eventName, totalAmount, orderId);

            _logger.LogInformation("Email sent successfully for order {OrderId}.", orderId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email {MessageBody}", messageBody);
            throw;
        }
    }
}