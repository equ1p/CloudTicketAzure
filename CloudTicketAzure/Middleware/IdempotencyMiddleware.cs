using CloudTicketAzure.Core.Interfaces;

namespace CloudTicketAzure.Middleware;

public class IdempotencyMiddleware
{
    private readonly RequestDelegate _next;

    public IdempotencyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IIdempotencyService idempotencyService)
    {
        if (!IsApplicable(context.Request))
        {
            await _next(context);
            return;
        }

        if (!context.Request.Headers.TryGetValue("Idempotency-Key", out var keyValues)
            || string.IsNullOrWhiteSpace(keyValues.FirstOrDefault()))
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "The 'Idempotency-Key' header is required for this endpoint."
            });
            return;
        }

        var idempotencyKey = keyValues.First()!;

        var cachedResponse = await idempotencyService.GetCachedResponseAsync(idempotencyKey);

        if (cachedResponse is not null)
        {
            context.Response.StatusCode = 200;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(cachedResponse);
            return;
        }

        var originalBodyStream = context.Response.Body;
        using var memoryStream = new MemoryStream();
        context.Response.Body = memoryStream;

        await _next(context);

        memoryStream.Position = 0;
        var responseBody = await new StreamReader(memoryStream).ReadToEndAsync();

        if (context.Response.StatusCode >= 200 && context.Response.StatusCode < 300)
        {
            await idempotencyService.SaveResponseAsync(
                idempotencyKey, responseBody, context.Response.StatusCode);
        }

        memoryStream.Position = 0;
        await memoryStream.CopyToAsync(originalBodyStream);
        context.Response.Body = originalBodyStream;
    }

    private static bool IsApplicable(HttpRequest request)
    {
        return request.Method == HttpMethods.Post
               && request.Path.StartsWithSegments("/api/tickets/buy", StringComparison.OrdinalIgnoreCase);
    }
}