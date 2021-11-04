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
    public class DeleteModel : PageModel
    {
        private readonly Canban.DAL.CanbanContext _context;

        public DeleteModel(Canban.DAL.CanbanContext context)
        {
            _context = context;
        }

        [BindProperty]
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

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Column = await _context.Columns.FindAsync(id);

            if (Column != null)
            {
                _context.Columns.Remove(Column);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
