using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Canban.DAL
{
    public class CanbanContext : DbContext
    {
        public CanbanContext(DbContextOptions<CanbanContext> options)
            : base(options)
        {
        }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<Column> Columns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Column>().ToTable("Column");
            modelBuilder.Entity<DAL.Job>().ToTable("Job");
        }
    }
}