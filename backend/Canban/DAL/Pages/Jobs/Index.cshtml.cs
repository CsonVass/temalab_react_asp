using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Canban.DAL;


namespace Canban.Pages.Jobs
{
    public class IndexModel : PageModel
    {
        private readonly Canban.DAL.CanbanContext _context;

        public IndexModel(Canban.DAL.CanbanContext context)
        {
            _context = context;
        }

        public IList<Job> Job { get;set; }

        public async Task OnGetAsync()
        {
            Job = await _context.Jobs.ToListAsync();
        }
    }
}
