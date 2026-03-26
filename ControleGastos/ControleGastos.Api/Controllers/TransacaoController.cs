using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransacaoController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
        {
            return await context.Transacoes.Include(t => t.Pessoa).Include(t => t.Categoria).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Transacao>> PostTransacao(Transacao transacao)
        {
            context.Transacoes.Add(transacao);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransacao(int id, Transacao transacao)
        {
            if (id != transacao.Id) return BadRequest();
            context.Entry(transacao).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransacao(int id)
        {
            var transacao = await context.Transacoes.FindAsync(id);
            if (transacao == null) return NotFound();
            context.Transacoes.Remove(transacao);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
