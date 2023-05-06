using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Practices_AspNetUsers_UserId",
                table: "Practices");

            migrationBuilder.DropIndex(
                name: "IX_Practices_UserId",
                table: "Practices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Practices_UserId",
                table: "Practices",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Practices_AspNetUsers_UserId",
                table: "Practices",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
