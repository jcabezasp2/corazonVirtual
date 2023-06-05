using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "OptimalScale",
                table: "Tools",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

             migrationBuilder.UpdateData(
                table: "Tools",
                keyColumn: "Id",
                keyValue: 1,
                column: "OptimalScale",
                value: 0.01 );
            migrationBuilder.UpdateData(
                table: "Tools",
                keyColumn: "Id",
                keyValue: 2,
                column: "OptimalScale",
                value: 0.019 );
            migrationBuilder.UpdateData(
                table: "Tools",
                keyColumn: "Id",
                keyValue: 3,
                column: "OptimalScale",
                value: 0.9 );
            migrationBuilder.UpdateData(
                table: "Tools",
                keyColumn: "Id",
                keyValue: 4,
                column: "OptimalScale",
                value: 0.02 );
            migrationBuilder.UpdateData(
                table: "Tools",
                keyColumn: "Id",
                keyValue: 5,
                column: "OptimalScale",
                value: 0.8 );
            migrationBuilder.UpdateData(
                table: "Tools",
                keyColumn: "Id",
                keyValue: 6,
                column: "OptimalScale",
                value: 0.1 );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptimalScale",
                table: "Tools");
        }
    }
}
