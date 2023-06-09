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
            
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] {  "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount" },
                values: new object[,]
                {
                      { "1", "admin", "ADMIN", "admin@example.es", "ADMIN@EXAMPLE.ES", false, false, false, true, 0,"AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="  },
                    { "2", "teacher", "TEACHER", "teacher@example.es", "TEACHER@EXAMPLE.ES", false, false, false, true, 0,"AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==" },
                    { "3", "student", "STUDENT", "student@example.es", "STUDENT@EXAMPLE.ES", false , false, false, true, 0,"AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==" },
                    {"4", "user4", "USER4", "user4@example.es",
                    "USER4@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                    {"5", "user5", "USER5", "user5@example.es", "USER5@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                     {"6", "user6", "USER6", "user6@example.es", "USER6@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                     {"7", "user7", "USER7", "user7@example.es", "USER7@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                     {"8", "user8", "USER8", "user8@example.es", "USER8@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                     {"9", "user9", "USER9", "user9@example.es", "USER9@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                     {"10", "user10", "USER10", "user10@example.es", "USER10@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                     {"11", "user11", "USER11", "user11@example.es", "USER11@EXAMPLE.ES", false, false, false, true, 0,
                    "AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="},
                        
                    
                }
            );
            
            
            
            
            migrationBuilder.InsertData(
                table: "ApplicactionUsers",
                columns: new[] {  "Id", "Name", "Surname", "Photo", "UserId" },
                values: new object[,]
                {                   
                    { 1, "User", "User", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 2 },
                    { 2, "User2", "User2", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 3 },
                    { 3, "User3", "User3", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 4 },
                    { 4, "User4", "User4", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 5 },
                    { 5, "User5", "User5", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 6 },
                    { 6, "User6", "User6", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 7 },
                    { 7, "User7", "User7", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 8 },
                    { 8, "User8", "User8", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 9 },
                    { 9, "User9", "User9", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 10 },
                    { 10, "User10", "User10", "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", 11 },

                }
            );

          
            migrationBuilder.InsertData(
                table: "Practice",
                columns: new[] {  "Id", "Date", "Observations", "Duration", "ProcedureId", "StepId", "UserId", "IsFinished" },
                values: new object[,]
                {                   
                    { 1, "2021-06-09", "Observations", 60, 1, 1, 1, false },
                    { 2, "2021-06-09", "Observations", 60, 1, 2, 1, false },
                    { 3, "2021-06-09", "Observations", 60, 1, 3, 1, false },
                    { 4, "2021-06-09", "Observations", 60, 1, 4, 1, false },
                    { 5, "2021-06-09", "Observations", 60, 1, 5, 1, false },
                    { 6, "2021-06-09", "Observations", 60, 1, 6, 1, false },
                    { 7, "2021-06-09", "Observations", 60, 1, 7, 1, false },
                    { 8, "2021-06-09", "Observations", 60, 1, 8, 1, false },
                    { 9, "2021-06-09", "Observations", 60, 1, 9, 1, false },
                    { 10, "2021-06-09", "Observations", 60, 1, 10, 1, false },
                    { 11, "2021-06-09", "Observations", 60, 1, 11, 1, false },
                    { 12, "2021-06-09", "Observations", 60, 1, 12, 1, false },
                    { 13, "2021-06-09", "Observations", 60, 1, 13, 1, false },
                    { 14, "2021-06-09", "Observations", 60, 1, 14, 1, false },
                    { 15, "2021-06-09", "Observations", 60, 1, 15, 1, false },
                    { 16, "2021-06-09", "Observations", 60, 1, 16, 1, false },
                    { 17, "2021-06-09", "Observations", 60, 1, 17, 1, false },
                    { 18, "2021-06-09", "Observations", 60, 1, 18, 11, false },
                    { 19, "2021-06-09", "Observations", 60, 1, 19, 10, false },
                    { 20, "2021-06-09", "Observations", 60, 1, 20, 7, false },
                    { 21, "2021-06-09", "Observations", 60, 1, 21, 1, false },
                    { 22, "2021-06-09", "Observations", 60, 1, 22, 4, false },
                    { 23, "2021-06-09", "Observations", 60, 1, 23, 3, false },
                    { 24, "2021-06-09", "Observations", 60, 1, 24, 2, false },
                    { 25, "2021-06-09", "Observations", 60, 1, 25, 6, false },
                    { 26, "2021-06-09", "Observations", 60, 1, 26, 4, false },
                    { 27, "2021-06-09", "Observations", 60, 1, 27, 8, false },
                    { 28, "2021-06-09", "Observations", 60, 1, 28, 1, false },
                    { 29, "2021-06-09", "Observations", 60, 1, 29, 1, false },
                    { 30, "2021-06-09", "Observations", 60, 1, 30, 5, false },
                    { 31, "2021-06-09", "Observations", 60, 1, 31, 2, false },

                }                                 
              
            );
            


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
