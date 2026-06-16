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
            new Ticket { Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"), EventName = "Stand-Up Comedy Show", Price = 800.00m, IsSold = false }
        );

        base.OnModelCreating(modelBuilder);
    }
}
