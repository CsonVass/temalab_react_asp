using System.Collections.Generic;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public interface IColumnRepository
    {
        Task<IReadOnlyCollection<Column>> ListColumns(string columnName = null);
        Task<Column> GetColumnOrNull(int columnId);
        IReadOnlyCollection<Job> ListJobsInColumn(int columnId);
        Task DeleteColumn(int columnId);
        Task UpdateColumn(Column column);
        Task InsertJobToColumn(string columnName, Job job = null);
    }
}