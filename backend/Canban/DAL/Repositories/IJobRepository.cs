using System.Collections.Generic;
using System.Threading.Tasks;

namespace Canban.DAL
{
    public interface IJobRepository
    {
   
        Task<Job> GetJobOrNull(int jobId);
        Task DeleteJob(int jobId);
        Task UpdateJob(Job job);

    }
}