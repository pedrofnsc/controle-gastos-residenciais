using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
        {
            return await context.Pessoas.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
        {
            context.Pessoas.Add(pessoa);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
        }
    }
}
