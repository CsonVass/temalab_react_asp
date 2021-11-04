
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public class JobRepository : IJobRepository
    {


        public Task DeleteJob(int jobId)
        {
            throw new NotImplementedException();
        }

        public Task<Job> GetJobOrNull(int jobId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateJob(Job job)
        {
            throw new NotImplementedException();
        }
    }
}