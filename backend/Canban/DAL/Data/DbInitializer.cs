using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Canban.DAL
    {
        public static class DbInitializer
        {
            public static void Initialize(CanbanContext context)
            {
                if (context.Jobs.Any())
                {
                    return;
                }

                var jobs = new Job[]
                {
                new Job{ID=1,Name="frontend",Description="Make the frontend of the project in react with bootstrap",DueDate=DateTime.Parse("2021.10.15.")},
                new Job{Name="backend",Description="Make the backend of the project in with entity framework",DueDate=DateTime.Parse("2021.11.4.")},
                new Job{Name="api",Description="Connect the frontend and the backend of the project with rest api",DueDate=DateTime.Parse("2021.12.06.")}
                };

                context.Jobs.AddRange(jobs);
                context.SaveChanges();

                var columns = new Column[]
                {
                new Column{Name="Pending"},
                new Column{Name="In_Progress"},
                new Column{Name="Done"},
                new Column{Name="Canceled"}
                };

                context.Columns.AddRange(columns);
                context.SaveChanges();
            }
        }
    }
