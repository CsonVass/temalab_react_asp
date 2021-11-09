
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Canban.DAL
{
    public class ColumnRepository : IColumnRepository
    {

        private readonly CanbanContext db;

        public ColumnRepository(CanbanContext db)
        {
            this.db = db;
        }

        public async Task DeleteColumn(int columnId)
        {
            int retries = 3;
            while (true)
            {
                var dbRecord = await db.Columns
                                .GetByIdOrNull(columnId);
                if (dbRecord == null)
                {
                    return;
                }

                db.Columns.Remove(dbRecord);

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

        public async Task<Column> GetColumnOrNull(int columnId)
        {
            var dbColumn = await db.Columns
                            .GetByIdOrNull(columnId);
            return dbColumn?.GetColumn();
        }

        public async Task InsertJobToColumn(string columnName, Job job = null)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyCollection<Column>> ListColumns(string columnName = null)
        {
            return await db.Columns
                           .SearchByName(columnName)
                           .GetColumns();
        }

        public IReadOnlyCollection<Job> ListJobsInColumn(int columnId)
        {
            var dbColumn = GetColumnOrNull(columnId);
            return dbColumn.Result.Jobs.ToArray();
        }

        public async Task UpdateColumn(Column column)
        {
            int retries = 3;
            while (true)
            {
                var dbRecord = await db.Columns
                                .GetByIdOrNull(column.ID);
                if (dbRecord == null)
                {
                    return;
                }
                dbRecord.Name = column.Name;
                dbRecord.Jobs = column.Jobs;

                db.Columns.Update(column);

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

    internal static class ColumnsRepositoryExtensions
    {
        public static async Task<IReadOnlyCollection<Column>> GetColumns(this IQueryable<Column> columns)
        {
            return await columns.Select(dbRec => dbRec.GetColumn()).ToArrayAsync();
        }

        public static Column GetColumn(this Column dbRecord) => new Column { ID = dbRecord.ID, Name = dbRecord.Name, Jobs=dbRecord.Jobs };

        public static Task<Column> GetByIdOrNull(this IQueryable<Column> columns, int id) => columns.FirstOrDefaultAsync(c => c.ID == id);

        public static IQueryable<Column> SearchByName(this IQueryable<Column> columns, string name)
        {
            if (string.IsNullOrEmpty(name))
                return columns;
            else
                return columns.Where(c => c.Name.Contains(name));
        }

    }
}