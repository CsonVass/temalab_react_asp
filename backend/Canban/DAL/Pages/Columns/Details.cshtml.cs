using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Canban.DAL;


namespace Canban.Pages.Columns
{
    public class DetailsModel : PageModel
    {
        private readonly Canban.DAL.CanbanContext _context;

        public DetailsModel(Canban.DAL.CanbanContext context)
        {
            _context = context;
        }

        public Column Column { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Column = await _context.Columns.FirstOrDefaultAsync(m => m.ID == id);

            if (Column == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
