using System;
using System.Collections.Generic;

namespace Canban.DAL
{
    public partial class Column
    {
        public Column()
        {
            TodoItems = new HashSet<TodoItem>();
        }

        public int ID { get; set; }
        public string Name { get; set; }

        
        public virtual ICollection<TodoItem> TodoItems { get; set; }
    }
}
