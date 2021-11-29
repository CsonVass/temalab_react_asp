using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Canban.DAL;

namespace Web.Pages.Canban
{
    public class IndexModel : PageModel
    {
        private readonly CanbanContext _context;

        public IndexModel(CanbanContext context)
        {
            _context = context;
        }

        public IList<Column> Column { get;set; }

        public async Task OnGetAsync()
        {
            Column = await _context.Columns.ToListAsync();
        }
    }
}
