using System;
using System.Collections.Generic;

namespace Canban.DAL
{
    public class Column
    {
        public int ID { get; set; }
        public string Name { get; set; }


        public ICollection<Job> Jobs { get; set; }
    }
}
