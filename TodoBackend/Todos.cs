using Microsoft.EntityFrameworkCore;

namespace TodoBackend.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public bool TodoComplete { get; set; }
    }

    class TodoDb : DbContext
    {
        public TodoDb(DbContextOptions options) : base(options) { }
        public DbSet<Todo> Todos { get; set; } = null!;
    }
}