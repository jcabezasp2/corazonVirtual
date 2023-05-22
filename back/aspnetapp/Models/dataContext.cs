using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace aspnetapp.Models;

public class dataContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public dataContext(DbContextOptions<dataContext> options) : base(options)
    {
    }

    public DbSet<Procedure> Procedures { get; set; } = null!;
    public DbSet<Step> Steps { get; set; } = null!;
    public DbSet<ApplicationUser> ApplicationUsers { get; set; } = null!;
    public DbSet<UserApiKey> UserApiKeys { get; set; } = null!;
    public DbSet<Tool> Tools {get; set; } = null!;
    public DbSet<Practice> Practices { get; set; } = null!;
    public DbSet<ProcedureStep> ProcedureStep { get; set; } = null!;
    public DbSet<Permission> Permissions { get; set; } = null!;
}