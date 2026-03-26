using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {
            return await context.Categorias.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            context.Categorias.Add(categoria);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCategorias), new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria(int id, Categoria categoria)
        {
            if (id != categoria.Id) return BadRequest();
            context.Entry(categoria).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            var categoria = await context.Categorias.FindAsync(id);
            if (categoria == null) return NotFound();
            context.Categorias.Remove(categoria);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
