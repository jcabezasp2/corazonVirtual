using Microsoft.EntityFrameworkCore;
using aspnetapp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<dataContext>(options => options.UseNpgsql("Host=localhost:5432; Database=corazon_virtual; Username=root; Password=root"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthorization();

app.MapControllers();

app.Run("http://localhost:8000");
