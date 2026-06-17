using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CloudTicketAzure.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreMockData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "Id", "EventName", "Price", "UserId" },
                values: new object[,]
                {
                    { new Guid("11112222-3333-4444-5555-666677778888"), "Theater Play: Hamlet", 900.00m, null },
                    { new Guid("12345678-1234-1234-1234-123456789012"), "Art Exhibition: Modernism", 300.00m, null },
                    { new Guid("87654321-4321-4321-4321-210987654321"), "Tech Startup Pitch Night", 150.00m, null },
                    { new Guid("99998888-7777-6666-5555-444433332222"), "Symphony Orchestra LIVE", 1800.00m, null },
                    { new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), "Azure Cloud Workshop", 500.00m, null },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), "Jazz & Blues Festival", 1200.00m, null },
                    { new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), "Champions League Final", 5500.00m, null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: new Guid("11112222-3333-4444-5555-666677778888"));

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: new Guid("12345678-1234-1234-1234-123456789012"));

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: new Guid("87654321-4321-4321-4321-210987654321"));

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: new Guid("99998888-7777-6666-5555-444433332222"));

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"));

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"));

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"));
        }
    }
}
