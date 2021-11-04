
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public class ColumnRepository : IColumnRepository
    {
        public Task DeleteColumn(int columnId)
        {
            throw new NotImplementedException();
        }

        public Task<Column> GetColumnOrNull(int columnId)
        {
            throw new NotImplementedException();
        }

        public Task InsertJobToColumn(string columnName, Job job = null)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyCollection<Job>> ListColumns(string columnName = null)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyCollection<Job>> ListJobsInColumn()
        {
            throw new NotImplementedException();
        }

        public Task UpdateColumn(Column column)
        {
            throw new NotImplementedException();
        }
    }
}