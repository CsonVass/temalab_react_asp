using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using Canban.DAL;
using System.Linq;

namespace Canban.BL
{
    public class CanbanManager
    {

        private readonly IColumnRepository columnRepository;
        private readonly ITodoItemRepository todoItemRepository;


        public CanbanManager(IColumnRepository columnRepository, ITodoItemRepository todoItemRepository)
        {
            this.columnRepository = columnRepository;
            this.todoItemRepository = todoItemRepository;
        }

        //ColumnRepository access
        public async Task<IReadOnlyCollection<Column>> ListColumns(string nameToSearchFor = null)
           => await columnRepository.ListColumns(nameToSearchFor);

        public async Task<Column> GetColumnOrNull(int columnId)
            => await columnRepository.GetColumnOrNull(columnId);

        public async Task<bool> TryDeleteColumn(int columnId)
        {
            using (var tran = new TransactionScope(
                TransactionScopeOption.Required,
                new TransactionOptions() { IsolationLevel = IsolationLevel.RepeatableRead },
                TransactionScopeAsyncFlowOption.Enabled))
            {
                var column = await columnRepository.GetColumnOrNull(columnId);
                if (column == null)
                    return false;

                bool hasTodoItems = (await todoItemRepository.ListTodoItemsInColumn(columnId)).Any();
                if (hasTodoItems)
                {
                    foreach (var item in (await todoItemRepository.ListTodoItemsInColumn(columnId)).ToList())
                    {
                        await todoItemRepository.DeleteTodoItem(item.ID);
                    }
                }

                await columnRepository.DeleteColumn(columnId);

                tran.Complete();
                return true;
            }
        }

        public async Task TryUpdateColumn(Column column_)
        {
            using (var tran = new TransactionScope(
               TransactionScopeOption.Required,
               new TransactionOptions() { IsolationLevel = IsolationLevel.RepeatableRead },
               TransactionScopeAsyncFlowOption.Enabled))
            {
               
                await columnRepository.UpdateColumn(column_);

                tran.Complete();
            }
        }

        public async Task AddNewColumn(Column column) => await columnRepository.AddNewColumn(column);

        //TodoItemRepository access
        public async Task<TodoItem> GetTodoItemOrNull(int todoId) => await todoItemRepository.GetTodoItemOrNull(todoId);
        public async Task<bool> TryDeleteTodoItem(int todoId)
        {
            using (var tran = new TransactionScope(
                TransactionScopeOption.Required,
                new TransactionOptions() { IsolationLevel = IsolationLevel.RepeatableRead },
                TransactionScopeAsyncFlowOption.Enabled))
            {
                var todoItem = await todoItemRepository.GetTodoItemOrNull(todoId);
                if (todoItem == null)
                    return false;

                await todoItemRepository.DeleteTodoItem(todoId);

                tran.Complete();
                return true;
            }
        }
        public async Task<bool> TryUpdateTodoItem(TodoItem todoItem_)
        {
            using (var tran = new TransactionScope(
              TransactionScopeOption.Required,
              new TransactionOptions() { IsolationLevel = IsolationLevel.RepeatableRead },
              TransactionScopeAsyncFlowOption.Enabled))
            {

                await todoItemRepository.UpdateTodoItem(todoItem_);

                tran.Complete();
                return true;
            }
        }
        public async Task<IReadOnlyCollection<TodoItem>> ListTodoItemsInColumn(int colId) => await todoItemRepository.ListTodoItemsInColumn(colId);
        public async Task AddNewTodoItem(TodoItem todoItem) => await todoItemRepository.AddNewTodoItem(todoItem);

    }
}





