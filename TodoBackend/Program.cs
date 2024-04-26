using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using TodoBackend.Models;

var builder = WebApplication.CreateBuilder(args);

// Checks the configuration provider for a connection string "Todos"
var connectionString = builder.Configuration.GetConnectionString("Todos") ?? "Data Source=Todos.db";

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSqlite<TodoDb>(connectionString);

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TODO API", Description = "An API for todo list items.", Version = "v1" });
});

// Used for CORS
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Used for CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
      builder =>
      {
          builder.WithOrigins(
            "http://localhost:3000", "*")
            .AllowAnyHeader()
            .AllowAnyMethod();
      });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "TODO API V1");
    });
}

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/", () => "Hello World! To check todos visit /todos. To test different emdpoints go to /swagger.");
app.MapGet("/todos/{id}", async (TodoDb db, int id) => await db.Todos.FindAsync(id));
app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync());
app.MapPost("/todos", async (TodoDb db, Todo todo) =>
{
    await db.Todos.AddAsync(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todo/{todo.Id}", todo);
});
app.MapPut("/todos/{id}", async (TodoDb db, Todo todoToUpdate, int id) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();
    todo.Description = todoToUpdate.Description;
    todo.TodoComplete = todoToUpdate.TodoComplete;
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/todos/{id}", async (TodoDb db, int id) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null)
    {
        return Results.NotFound();
    }
    db.Todos.Remove(todo);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.Run();