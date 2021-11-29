
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public class TodoItemRepository : ITodoItemRepository
    {
        private readonly CanbanContext db;

        public TodoItemRepository(CanbanContext db)
        {
            this.db = db;
        }

        public async Task AddNewTodoItem(TodoItem todoItem)
        {
            db.TodoItems.Add(todoItem);
            await db.SaveChangesAsync();
            return;
        }

        public async Task<bool> DeleteTodoItem(int todoItemId)
        {
            int retries = 3;
            while (true)
            {
                var dbRecord = await db.TodoItems
                                .GetByIdOrNull(todoItemId);
                if (dbRecord == null)
                {
                    return false;
                }

                db.TodoItems.Remove(dbRecord);

                try
                {
                    await db.SaveChangesAsync();
                    return true;
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

        public async Task<TodoItem> GetTodoItemOrNull(int todoItemId)
        {
            var dbTodoItem = await db.TodoItems
                        .GetByIdOrNull(todoItemId);

            return dbTodoItem?.GetTodoItem();
        }

        public async Task<IReadOnlyCollection<TodoItem>> ListTodoItemsInColumn(int columnId)
        {

            return await db.TodoItems
                        .SearchByColumnId(columnId)
                        .OrderBy(t => t.Priority)
                        .GetTodoItems();
        }

        public async Task<bool> UpdateTodoItem(TodoItem todoItem)
        {
            int retries = 3;

            while (true)
            {
                var dbRecord = await db.TodoItems
                                .GetByIdOrNull(todoItem.ID);
                if (dbRecord == null)
                {
                    return false;
                }
                dbRecord.Name = todoItem.Name;
                dbRecord.Description = todoItem.Description;
                dbRecord.DueDate = todoItem.DueDate;
                dbRecord.Priority = todoItem.Priority;

                db.TodoItems.Update(dbRecord);

                try
                {
                    await db.SaveChangesAsync();
                    return true;
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
    internal static class TodoItemRepositoryExtensions
    {
        public static async Task<IReadOnlyCollection<TodoItem>> GetTodoItems(this IQueryable<TodoItem> todoItems)
        {
            return await todoItems.Select(dbRec => dbRec.GetTodoItem()).ToArrayAsync();
        }

        public static TodoItem GetTodoItem(this TodoItem dbRecord) => new TodoItem { ID = dbRecord.ID, ColumnID = dbRecord.ColumnID,
                                    Name = dbRecord.Name, Description = dbRecord.Description, DueDate = dbRecord.DueDate, Priority = dbRecord.Priority };

        public static Task<TodoItem> GetByIdOrNull(this IQueryable<TodoItem> todoItems, int id) => todoItems.FirstOrDefaultAsync(j => j.ID == id);

        public static IQueryable<TodoItem> SearchByColumnId(this IQueryable<TodoItem> todoItems, int colId) => todoItems.Where(i => i.ColumnID.Equals(colId));
    }
}