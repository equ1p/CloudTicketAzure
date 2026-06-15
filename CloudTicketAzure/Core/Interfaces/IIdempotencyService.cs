namespace CloudTicketAzure.Core.Interfaces
{
    public interface IIdempotencyService
    {
        Task<string?> GetCachedResponseAsync(string key);
        Task SaveResponseAsync(string key, string responseJson, int statusCode);
    }
}
