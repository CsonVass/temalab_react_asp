
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Canban.DAL
{
    public class JobRepository : IJobRepository
    {
        private readonly CanbanContext db;

        public JobRepository(CanbanContext db)
        {
            this.db = db;
        }

        public async Task DeleteJob(int jobId)
        {
            int retries = 3;
            while (true)
            {
                var dbRecord = await db.Jobs
                                .GetByIdOrNull(jobId);
                if(dbRecord == null)
                {
                    return;
                }

                db.Jobs.Remove(dbRecord);

                try
                {
                    await db.SaveChangesAsync();
                    return;
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    if (--retries < 0)
                        throw;

                    foreach (var e in ex.Entries)
                        await e.ReloadAsync();
                }
            }
        }

        public async Task<Job> GetJobOrNull(int jobId)
        {
            var dbJob = await db.Jobs
                        .GetByIdOrNull(jobId);

            return dbJob?.GetJob();
        }

        public async Task UpdateJob(Job job)
        {
            int retries = 3;
            while (true)
            {
                var dbRecord = await db.Jobs
                                .GetByIdOrNull(job.ID);
                if (dbRecord == null)
                {
                    return;
                }
                dbRecord.Name = job.Name;
                dbRecord.Description = job.Description;
                dbRecord.DueDate = job.DueDate;

                db.Jobs.Update(job);

                try
                {
                    await db.SaveChangesAsync();
                    return;
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    if (--retries < 0)
                        throw;

                    foreach (var e in ex.Entries)
                        await e.ReloadAsync();
                }
            }
        }
    }


    //helper methods
    internal static class JobRepositoryExtensions
    {
        public static async Task<IReadOnlyCollection<Job>> GetJob(this IQueryable<Job> jobs)
        {
            return await jobs.Select(dbRec => dbRec.GetJob()).ToArrayAsync();
        }

        public static Job GetJob(this Job dbRecord) => new Job { ID=dbRecord.ID, Name=dbRecord.Name, Description=dbRecord.Description, DueDate=dbRecord.DueDate };

        public static Task<Job> GetByIdOrNull(this IQueryable<Job> jobs, int id) => jobs.FirstOrDefaultAsync(j => j.ID == id);
    }
}