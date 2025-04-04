using Microsoft.EntityFrameworkCore;
using backendAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbPath = Path.Combine(AppContext.BaseDirectory, "Bookstore.sqlite");
builder.Services.AddDbContext<BooksDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactApp",
    policy =>
    {
        policy.WithOrigins("https://mango-smoke-07062ba0f.6.azurestaticapps.net")
            .AllowAnyHeader()
            .AllowAnyMethod();
    }));

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseCors("AllowReactApp");


app.UseAuthorization();

app.MapControllers();

app.Run();
