using System;

namespace Canban.DAL
{
    public class Job
    {
        
        public Job(int id, string name, string desc, DateTime date)
        {
            this.ID = id;
            this.Name = name;
            this.Description = desc;
            this.DueDate = date;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}