using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace aspnetapp.Models;

public class dataContext : IdentityDbContext<IdentityUser>
{
    public dataContext(DbContextOptions<dataContext> options) : base(options)
    {
    }

    public DbSet<Procedure> Procedures { get; set; } = null!;
    public DbSet<Step> Steps { get; set; } = null!;
}