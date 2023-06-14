using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _15 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ApplicationUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

                migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] {  "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount" },
                values: new object[,]
                {
                     
                    {"4", "user4", "USER4", "user4@example.es",
                    "USER4@EXAMPLE.ES", false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=", null, null, null, false, false, null,false, 0},
                    {"5", "user5", "USER5", "user5@example.es", "USER5@EXAMPLE.ES",  false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=", null, null, null, false, false, null,false, 0},
                     {"6", "user6", "USER6", "user6@example.es", "USER6@EXAMPLE.ES", false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                     {"7", "user7", "USER7", "user7@example.es", "USER7@EXAMPLE.ES",  false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                     {"8", "user8", "USER8", "user8@example.es", "USER8@EXAMPLE.ES", false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                     {"9", "user9", "USER9", "user9@example.es", "USER9@EXAMPLE.ES",  false, "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==", null, null, null, false, false, null,false, 0},
                    
                        
                    
                }
            );

                        
             
            migrationBuilder.InsertData(
                table: "ApplicationUsers",
                columns: new[] {  "Id", "Name", "Surname", "Photo", "UserId" },
                values: new object[,]
                {                   
                    { 1, "User", "User", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "2" },
                    { 2, "User2", "User2", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "3" },
                    { 3, "User3", "User3", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "4" },
                    { 4, "User4", "User4", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "5" },
                    { 5, "User5", "User5", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "6" },
                    { 6, "User6", "User6", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "7" },
                    { 7, "User7", "User7", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "8" },
                    { 8, "User8", "User8", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", "9" },
            
                  

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
            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "ApplicationUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
