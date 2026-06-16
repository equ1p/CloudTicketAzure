using Azure;
using Azure.Data.Tables;
using CloudTicketAzure.Core.Interfaces;

namespace CloudTicketAzure.Infrastructure.Services;

public class IdempotencyService : IIdempotencyService
{
    private readonly TableClient _tableClient;
    private const string TableName = "IdempotencyKeys";
    private const string PartitionKey = "idempotency";

    public IdempotencyService(TableServiceClient tableServiceClient)
    {
        _tableClient = tableServiceClient.GetTableClient(TableName);
        _tableClient.CreateIfNotExists();
    }

    public async Task<string?> GetCachedResponseAsync(string key)
    {
        try
        {
            var response = await _tableClient.GetEntityAsync<TableEntity>(PartitionKey, key);
            return response.Value.GetString("ResponseBody");
        }
        catch (RequestFailedException ex) when (ex.Status == 404)
        {
            return null;
        }
    }

    public async Task SaveResponseAsync(string key, string responseJson, int statusCode)
    {
        var entity = new TableEntity(PartitionKey, key)
        {
            { "ResponseBody", responseJson },
            { "StatusCode", statusCode },
            { "CreatedAt", DateTimeOffset.UtcNow }
        };

        await _tableClient.UpsertEntityAsync(entity);
    }
}
