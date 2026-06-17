using Azure.Data.Tables;
using Azure.Messaging.ServiceBus;
using CloudTicketAzure.Core.Interfaces;
using CloudTicketAzure.Features.Tickets;
using CloudTicketAzure.Infrastructure.Data;
using CloudTicketAzure.Infrastructure.Services;
using CloudTicketAzure.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

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

// Application Services
builder.Services.AddScoped<TicketService>();

// Background Services
builder.Services.AddHostedService<OutboxProcessor>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.UseMiddleware<IdempotencyMiddleware>();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
