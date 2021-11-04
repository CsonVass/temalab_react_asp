using System.Collections.Generic;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public interface IColumnRepository
    {
        Task<IReadOnlyCollection<Job>> ListColumns(string columnName = null);
        Task<Column> GetColumnOrNull(int columnId);
        Task<IReadOnlyCollection<Job>> ListJobsInColumn();
        Task DeleteColumn(int columnId);
        Task UpdateColumn(Column column);
        Task InsertJobToColumn(string columnName, Job job = null);
    }
}