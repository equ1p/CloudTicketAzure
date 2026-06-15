using CloudTicketAzure.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CloudTicketAzure.Infrastructure.Data.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");
            builder.HasKey(o => o.Id);
            
            builder.Property(o => o.PurchaseDate)
                .IsRequired() ;

            builder.Property(o => o.TotalAmount)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(o => o.Ticket)
                .WithOne(o => o.Order)
                .HasForeignKey<Order>(o => o.TicketId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(o => o.UserId);
        }
    }
}
