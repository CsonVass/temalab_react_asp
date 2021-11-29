using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public class CanbanContext : DbContext
    {
        public CanbanContext() { }

        public CanbanContext(DbContextOptions<CanbanContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Column> Columns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Column>().ToTable("Column");
            modelBuilder.Entity<TodoItem>().ToTable("TodoItem");
        }
    }
}