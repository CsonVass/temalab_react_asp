using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Canban.DAL;

namespace Canban.Pages.Columns
{
    public class CreateModel : PageModel
    {
        private readonly Canban.DAL.CanbanContext _context;

        public CreateModel(Canban.DAL.CanbanContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Column Column { get; set; }

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Columns.Add(Column);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
