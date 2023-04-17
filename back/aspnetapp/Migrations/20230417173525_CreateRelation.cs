using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class CreateRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Steps_Procedures_ProcedureId",
                table: "Steps");

            migrationBuilder.DropIndex(
                name: "IX_Steps_ProcedureId",
                table: "Steps");

            migrationBuilder.DropColumn(
                name: "ProcedureId",
                table: "Steps");

            migrationBuilder.CreateTable(
                name: "ProcedureStep",
                columns: table => new
                {
                    ProceduresId = table.Column<int>(type: "integer", nullable: false),
                    StepsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcedureStep", x => new { x.ProceduresId, x.StepsId });
                    table.ForeignKey(
                        name: "FK_ProcedureStep_Procedures_ProceduresId",
                        column: x => x.ProceduresId,
                        principalTable: "Procedures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcedureStep_Steps_StepsId",
                        column: x => x.StepsId,
                        principalTable: "Steps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProcedureStep_StepsId",
                table: "ProcedureStep",
                column: "StepsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcedureStep");

            migrationBuilder.AddColumn<int>(
                name: "ProcedureId",
                table: "Steps",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Steps_ProcedureId",
                table: "Steps",
                column: "ProcedureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Steps_Procedures_ProcedureId",
                table: "Steps",
                column: "ProcedureId",
                principalTable: "Procedures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
