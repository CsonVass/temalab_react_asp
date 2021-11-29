using System.Collections.Generic;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public interface ITodoItemRepository
    {

        Task<TodoItem> GetTodoItemOrNull(int todoId);
        Task<bool> DeleteTodoItem(int todoId);
        Task<bool> UpdateTodoItem(TodoItem todoItem);
        Task<IReadOnlyCollection<TodoItem>> ListTodoItemsInColumn(int columnId);
        Task AddNewTodoItem(TodoItem todoItem);

    }
}