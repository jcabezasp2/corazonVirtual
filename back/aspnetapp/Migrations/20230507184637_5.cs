using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcedureStep_Procedures_ProceduresId",
                table: "ProcedureStep");

            migrationBuilder.DropForeignKey(
                name: "FK_ProcedureStep_Steps_StepsId",
                table: "ProcedureStep");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProcedureStep",
                table: "ProcedureStep");

            migrationBuilder.RenameColumn(
                name: "StepsId",
                table: "ProcedureStep",
                newName: "StepId");

            migrationBuilder.RenameColumn(
                name: "ProceduresId",
                table: "ProcedureStep",
                newName: "ProcedureId");

            migrationBuilder.RenameIndex(
                name: "IX_ProcedureStep_StepsId",
                table: "ProcedureStep",
                newName: "IX_ProcedureStep_StepId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProcedureStep",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "ProcedureStep",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProcedureStep",
                table: "ProcedureStep",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProcedureStep_ProcedureId",
                table: "ProcedureStep",
                column: "ProcedureId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcedureStep_Procedures_ProcedureId",
                table: "ProcedureStep",
                column: "ProcedureId",
                principalTable: "Procedures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProcedureStep_Steps_StepId",
                table: "ProcedureStep",
                column: "StepId",
                principalTable: "Steps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcedureStep_Procedures_ProcedureId",
                table: "ProcedureStep");

            migrationBuilder.DropForeignKey(
                name: "FK_ProcedureStep_Steps_StepId",
                table: "ProcedureStep");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProcedureStep",
                table: "ProcedureStep");

            migrationBuilder.DropIndex(
                name: "IX_ProcedureStep_ProcedureId",
                table: "ProcedureStep");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProcedureStep");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "ProcedureStep");

            migrationBuilder.RenameColumn(
                name: "StepId",
                table: "ProcedureStep",
                newName: "StepsId");

            migrationBuilder.RenameColumn(
                name: "ProcedureId",
                table: "ProcedureStep",
                newName: "ProceduresId");

            migrationBuilder.RenameIndex(
                name: "IX_ProcedureStep_StepId",
                table: "ProcedureStep",
                newName: "IX_ProcedureStep_StepsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProcedureStep",
                table: "ProcedureStep",
                columns: new[] { "ProceduresId", "StepsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProcedureStep_Procedures_ProceduresId",
                table: "ProcedureStep",
                column: "ProceduresId",
                principalTable: "Procedures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProcedureStep_Steps_StepsId",
                table: "ProcedureStep",
                column: "StepsId",
                principalTable: "Steps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
