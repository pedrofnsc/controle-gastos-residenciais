using ControleGastos.Api.Data;
using ControleGastos.Api.DTO;
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

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPessoa(int id, Pessoa pessoa)
        {
            if (id != pessoa.Id) return BadRequest(); 
            context.Entry(pessoa).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoa(int id)
        {
            var pessoa = await context.Pessoas.FindAsync(id);
            if (pessoa == null) return NotFound();
            context.Pessoas.Remove(pessoa);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("totais")]
        public async Task<ActionResult<RelatorioTotaisPessoaDto>> GetTotaisPorPessoa() //Calculando a soma total de receitas, despesas e saldo.
        {
            var pessoas = await context.Pessoas.ToListAsync();
            var transacoes = await context.Transacoes.ToListAsync();

            var pessoasComTotais = pessoas.Select(p => new TotaisPessoaDto
            {
                Nome = p.Nome,
                TotalReceitas = transacoes
                    .Where(t => t.PessoaId == p.Id && t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor),
                TotalDespesas = transacoes
                    .Where(t => t.PessoaId == p.Id && t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor)
            }).ToList();

            foreach (var pessoa in pessoasComTotais)
            {
                pessoa.Saldo = pessoa.TotalReceitas - pessoa.TotalDespesas;
            }

            var relatorio = new RelatorioTotaisPessoaDto
            {
                Pessoas = pessoasComTotais,
                TotalGeralReceitas = pessoasComTotais.Sum(p => p.TotalReceitas),
                TotalGeralDespesas = pessoasComTotais.Sum(p => p.TotalDespesas),
                SaldoLiquidoGeral = pessoasComTotais.Sum(p => p.Saldo)
            };

            return Ok(relatorio);
        }
    }
}
