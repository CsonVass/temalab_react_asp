using System.Collections.Generic;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public interface IColumnRepository
    {
        Task<IReadOnlyCollection<Column>> ListColumns(string columnName = null);
        Task<Column> GetColumnOrNull(int columnId);
        Task DeleteColumn(int columnId);
        Task UpdateColumn(Column column);
        Task AddNewColumn(Column column);
    }
}