using CloudTicketAzure.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace CloudTicketAzure.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Ticket> Tickets => Set<Ticket>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OutboxMessage> OutboxMessages => Set<OutboxMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        modelBuilder.Entity<User>().HasData(
            new User { Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), Email = "john@example.com", Name = "John Doe" },
            new User { Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), Email = "jane@example.com", Name = "Jane Smith" }
        );

        modelBuilder.Entity<Ticket>().HasData(
            new Ticket { Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), EventName = "Ocean Elzy Concert", Price = 1500.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), EventName = "IT Conference 2026", Price = 2500.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"), EventName = "Stand-Up Comedy Show", Price = 800.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"), EventName = "Azure Cloud Workshop", Price = 500.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), EventName = "Jazz & Blues Festival", Price = 1200.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("ffffffff-ffff-ffff-ffff-ffffffffffff"), EventName = "Champions League Final", Price = 5500.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("12345678-1234-1234-1234-123456789012"), EventName = "Art Exhibition: Modernism", Price = 300.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("87654321-4321-4321-4321-210987654321"), EventName = "Tech Startup Pitch Night", Price = 150.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("11112222-3333-4444-5555-666677778888"), EventName = "Theater Play: Hamlet", Price = 900.00m, IsSold = false },
            new Ticket { Id = Guid.Parse("99998888-7777-6666-5555-444433332222"), EventName = "Symphony Orchestra LIVE", Price = 1800.00m, IsSold = false }
        );

        base.OnModelCreating(modelBuilder);
    }
}
