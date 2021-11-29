using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Canban.DAL;
using Canban.BL;

namespace API.Controllers
{
    [Route("api/columns")]
    [ApiController]
    public class ColumnsController : ControllerBase
    {
        private readonly CanbanManager cm;

        public ColumnsController(CanbanManager _cm) => this.cm = _cm;

        // GET: api/Columns
        [HttpGet]
        public async Task<IEnumerable<Column>> GetColumns()
        {
            return await cm.ListColumns();
        }

        // GET: api/Columns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Column>> GetColumn(int id)
        {
            var column = await cm.GetColumnOrNull(id);

            if (column == null)
            {
                return NotFound();
            }

            return column;
        }

        // PUT: api/Columns/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColumn(int id, Column column)
        {           
            if (id != column.ID)
            {
                return BadRequest();
            }

            try
            {
                await cm.TryUpdateColumn(column);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ColumnExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw ex;
                }

            }          

            return NoContent();
        }

        // POST: api/Columns
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Column>> PostColumn(Column column)
        {
            await cm.AddNewColumn(column);
            return CreatedAtAction(nameof(GetColumn), new { id = column.ID }, column);
        }

        // DELETE: api/Columns/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Column>> DeleteColumn(int id)
        {
            var column = await cm.GetColumnOrNull(id);
            if (column == null)
            {
                return NotFound();
            }

            await cm.TryDeleteColumn(id);

            return column;
        }


        //TodoItem
        [HttpGet("{colId}/todoItems")]
        public async Task<IEnumerable<TodoItem>> GetTodoItems(int colId)
        {
            return await cm.ListTodoItemsInColumn(colId);
        }

        [HttpGet("{colId}/todoItems/{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            var todoItem = await cm.GetTodoItemOrNull(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpPut("{colId}/todoItems/{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {
            if (id != todoItem.ID)
            {
                return BadRequest();
            }

            try
            {
                await cm.TryUpdateTodoItem(todoItem);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw ex;
                }

            }

            return NoContent();
        }

        [HttpPost("{colId}/todoItems")]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            await cm.AddNewTodoItem(todoItem);

            return CreatedAtAction(nameof(GetColumn), new { id = todoItem.ID }, todoItem);
        }

        [HttpDelete("{colId}/todoItems/{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(int id)
        {
            var todoItem = await cm.GetTodoItemOrNull(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            await cm.TryDeleteTodoItem(id);

            return todoItem;
        }


        //Helper methods
        private bool ColumnExists(int id)
        {
            return cm.GetColumnOrNull(id) != null;
        }

        private bool TodoItemExists(int id)
        {
            return cm.GetTodoItemOrNull(id) != null;
        }




    }
}
