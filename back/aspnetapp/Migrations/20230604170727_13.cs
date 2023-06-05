using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "StepTool",
                columns: new[] {  "StepsId", "ToolsId" },
                values: new object[,]     

            {
            {1,1},
            {1,2},
            {1,3},
            {2,3},
            {2,4},
            {3,1},
            {3,2},
            {3,3},
            {4,1},
            {5,5},
            {5,6},
            {6,1},
            {6,6},
            {7,1},
            {8,1},
            {8,2},
            {8,6},
            {9,1},
            {10,5},
            {10,6},
            {11,3},
            {11,4},
            {12,5},
            {12,6},
            {13,6},
            {14,4},
            {14,5},
            {15,1},
            {15,6},
            {16,2},
            {16,5},
            {17,3}

        }
        );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
