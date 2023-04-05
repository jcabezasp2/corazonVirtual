using Microsoft.EntityFrameworkCore;

namespace aspnetapp.Models;

public class dataContext : DbContext
{
    public dataContext(DbContextOptions<dataContext> options) : base(options)
    {
    }

    public DbSet<Procedure> Procedures { get; set; } = null!;
}