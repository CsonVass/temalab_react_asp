using System;

namespace Canban.DAL
{
    public partial class TodoItem
    {
        public TodoItem() { }

        public int ID { get; set; }
        public int ColumnID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int Priority { get; set; }

    }
}