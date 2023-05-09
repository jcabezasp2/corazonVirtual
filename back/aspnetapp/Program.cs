using Microsoft.EntityFrameworkCore;
using aspnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using aspnetapp.Authentication.ApiKey;
using Microsoft.AspNetCore.Authentication;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Linea para que funcione el docker
builder.Services.AddDbContext<dataContext>(options => options.UseNpgsql("Host=postgres:5432; Database=corazon_virtual; Username=root; Password=root"));

// Linea para que funcionen las migraciones
// builder.Services.AddDbContext<dataContext>(options => options.UseNpgsql("Host=localhost:5432; Database=corazon_virtual; Username=root; Password=root"));



var db = builder.Services.BuildServiceProvider().GetService<dataContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    options => {
        options.SwaggerDoc("v1", new OpenApiInfo { Title = "Corazon Virtual API", Version = "v1" });
        options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Para que funcione introduzca 'Bearer' seguido de un espacio y el token JWT",
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey, 
        BearerFormat = "JWT",
        Scheme = "Bearer"
        });
        options.AddSecurityDefinition("ApiKey", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "ApiKey",
        Name = "Api-Key",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "ApiKey"
        });

        var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
        options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
        {
        options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference
                    {
                        Id = "Bearer",
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme
                    },

                    Name = "Bearer",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                },
                new List<string>()
            }
        });
        options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference
                    {
                        Id = "ApiKey",
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme
                    },

                    Name = "ApiKey",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                },
                new List<string>()
            }
        });
    }}
);
builder.Services.AddScoped<aspnetapp.Services.JwtService>();
builder.Services.AddScoped<aspnetapp.Services.ApiKeyService>();

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => {
    options.User.AllowedUserNameCharacters = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789-._@+/ ";
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<dataContext>()
    .AddDefaultTokenProviders();

// TODO coger los datos de appsettings.json
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "http://*:8000",
            ValidAudience = "http://*:8000",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is my custom Secret key for authnetication"))
        };
    }).AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>("ApiKey", options => { }
    );

//Cors allow all
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");
app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run("http://*:8000");
