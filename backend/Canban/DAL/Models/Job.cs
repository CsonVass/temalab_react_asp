using System;

namespace Canban.DAL
{
    public class Job
    {
        
        public Job() { }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}