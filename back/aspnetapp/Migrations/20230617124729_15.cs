﻿using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _15 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUsers");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] {  "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount" },
                values: new object[,]
                {
                     
                    
                     {"6", "user6", "USER6", "user6@example.es", "USER6@EXAMPLE.ES", false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                     {"7", "user7", "USER7", "user7@example.es", "USER7@EXAMPLE.ES",  false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                     {"8", "user8", "USER8", "user8@example.es", "USER8@EXAMPLE.ES", false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                     {"9", "user9", "USER9", "user9@example.es", "USER9@EXAMPLE.ES",  false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                    
                        
                    
                }
            );

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[,]
                {
                    { "4", "3" },
                    { "5", "3" },
                    { "6", "3" },
                    { "7", "3" },
                    { "8", "3" },
                    { "9", "3" }
                  
                }
            );

            migrationBuilder.InsertData(
                table: "Practices",
                columns: new[] {  "Date", "Observations", "Duration", "ProcedureId","UserId", "StepId", "IsFinished" },
                values: new object[,]
                {                   
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 40, 1,"3", 1, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 30, 1,"2", 2, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 20, 1,"3", 3, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 15, 1,"8", 4, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 25, 1,"3", 5, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 50, 1,"3", 6, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"1", 7, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 23, 1,"5", 8, false },
                    { new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"3", 9, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1, "2",10, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1, "7",10, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 45, 1, "9",12, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1, "6",13, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 55, 1, "1",14, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 35, 1, "3",15, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 26, 1, "4",16, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 42, 1, "1",17, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 18, 1, "8", 8, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 34, 1, "8", 9 , false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 66, 1, "7",10, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 54, 1,"1", 1, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"4", 3, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"3", 2, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"2", 6, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"6", 8, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1, "4",16, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1, "8",13, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"1", 5, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1, "1",14, false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1,"5", 12,  false },
                    {  new DateTime(2021, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Observations", 60, 1, "2",10, false },

                }                                 
              
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Photo = table.Column<string>(type: "text", nullable: true),
                    Surname = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUsers", x => x.Id);
                });
        }
    }
}
