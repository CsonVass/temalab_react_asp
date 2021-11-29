using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class Column
    {
        public string Name { get; set; }
        public ICollection<TodoItem> TodoItems { get; set; }
    }
}
