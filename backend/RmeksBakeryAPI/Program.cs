var builder = WebApplication.CreateBuilder(args);

// ✅ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();

var app = builder.Build();

// ✅ Use CORS
app.UseCors("AllowAll");

app.MapControllers();

// ✅ VERY IMPORTANT FOR RENDER
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Urls.Add($"http://0.0.0.0:{port}");

app.Run();