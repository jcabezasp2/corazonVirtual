using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] {  "Id", "Name", "Description" },
                values: new object[,]
                {
                    { 21, "CommentPractice", "Add a comment to a practice" },
                    { 22, "DeletePractice", "Delete a practice" },
                }
            );

            migrationBuilder.InsertData(
                table: "AspNetRoleClaims",
                columns: new[] {  "Id", "ClaimType", "ClaimValue", "RoleId" },
                values: new object[,]
                {
                    { 1, "API", "CreateProcedure", "2" },
                    { 2, "API", "DeleteProcedure", "2" },
                    { 3, "API", "UpdateProcedure", "2"},
                    { 4, "API", "CreateStep", "2"},
                    { 5, "API", "DeleteStep", "2"},
                    { 6, "API", "UpdateStep", "2"},
                    { 7, "API", "CreateRole", "1"},
                    { 8, "API", "DeleteRole", "1"},
                    { 9, "API", "UpdateRole", "1"},
                    { 10, "API", "CreateUser", "1"},
                    { 11, "API", "CreateUser", "2"},
                    { 12, "API", "UpdateUser", "1"},
                    { 13, "API", "BlockUser", "1"},
                    { 14, "API", "CreatePractice", "3"},
                    { 15, "API", "UpdatePractice", "3"},
                    { 16, "API", "CreateTool", "2"},
                    { 17, "API", "UpdateTool", "2"},
                    { 18, "API", "DeleteTool", "2"},
                    { 19, "API", "CommentPractice", "2"},
                    { 20, "API", "DeletePractice", "1"},
                }
            );

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ApplicationUsers",
                nullable: false
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
