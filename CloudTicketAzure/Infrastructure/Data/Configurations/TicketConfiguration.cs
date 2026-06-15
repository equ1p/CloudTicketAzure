using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CloudTicketAzure.Core.Entities;

namespace CloudTicketAzure.Infrastructure.Data.Configurations
{
    public class TicketConffiguration : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.ToTable("Tickets");
            builder.HasKey(t => t.Id);

            builder.Property(t => t.EventName)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(t => t.Price)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(t => t.IsSold)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(t => t.RowVersion)
                .IsRowVersion();

            builder.HasOne(t => t.User)
                .WithMany(u => u.Tickets)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(t => t.IsSold)
                .HasFilter("[IsSold] = 0")
                .HasDatabaseName("IX_Tickets_Available");
        }
    }
}
