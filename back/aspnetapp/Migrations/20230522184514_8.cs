using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });
            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "Id", "Name", "Description" },
                values: new object[,]{
                    { 1, "CreateProcedure", "Create a procedure" },
                    { 2, "DeleteProcedure", "Delete a procedure"},
                    { 3, "UpdateProcedure", "Update a procedure"},
                    { 4, "CreateStep", "Create a step"},
                    { 5, "DeleteStep", "Delete a step"},
                    { 6, "UpdateStep", "Update a step"},
                    { 7, "CreateRole", "Create a role"},
                    { 8, "DeleteRole", "Delete a role"},
                    { 9, "UpdateRole", "Update a role"},
                    { 10, "CreateUser", "Create a user"},
                    { 11, "DeleteUser", "Delete a user"},
                    { 12, "UpdateUser", "Update a user"},
                    { 13, "BlockUser", "Block a user"},
                    { 14, "CreatePractice", "Create a practice"},
                    { 15, "DeletePractice", "Delete a practice"},
                    { 16, "UpdatePractice", "Update a practice"},
                    { 17, "CreateTool", "Create a tool"},
                    { 18, "UpdateTool", "Update a tool"},
                    { 19, "DeleteTool", "Delete a tool"},
                    { 20, "AssignRole", "Assign Role to user"}}
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Permissions");
        }
    }
}
