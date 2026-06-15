using Azure.Data.Tables;
using Azure.Messaging.ServiceBus;
using CloudTicketAzure.Core.Interfaces;
using CloudTicketAzure.Features.Tickets;
using CloudTicketAzure.Infrastructure.Data;
using CloudTicketAzure.Infrastructure.Services;
using CloudTicketAzure.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers and OpenApi
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(5),
            errorNumbersToAdd: null)));

// Azure Table Storage
builder.Services.AddSingleton(sp =>
    new TableServiceClient(
        builder.Configuration.GetConnectionString("AzureTableStorage")));

builder.Services.AddSingleton<IIdempotencyService, IdempotencyService>();

// Azure Service Bus

builder.Services.AddSingleton(sp =>
    new ServiceBusClient(
        builder.Configuration.GetConnectionString("AzureServiceBus")));

builder.Services.AddSingleton<IServiceBusPublisher, ServiceBusPublisher>();

// Application services
builder.Services.AddHostedService<OutboxProcessor>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseMiddleware<IdempotencyMiddleware>();

app.MapControllers();

app.Run();
