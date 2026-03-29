using ControleGastos.Api.Data;
using ControleGastos.Api.DTO;
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

        [HttpGet("totais")]
        public async Task<ActionResult<RelatorioTotaisCategoriaDto>> GetTotaisPorCategoria() //Calculando a soma total de receitas, despesas e saldo.
        {
            var categorias = await context.Categorias.ToListAsync();
            var transacoes = await context.Transacoes.ToListAsync();

            var categoriasComTotais = categorias.Select(c => new TotaisCategoriaDto
            {
                Descricao = c.Descricao,
                TotalReceitas = transacoes
                    .Where(t => t.CategoriaId == c.Id && t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor),
                TotalDespesas = transacoes
                    .Where(t => t.CategoriaId == c.Id && t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor)
            }).ToList();

            foreach (var categoria in categoriasComTotais)
            {
                categoria.Saldo = categoria.TotalReceitas - categoria.TotalDespesas;
            }

            var relatorio = new RelatorioTotaisCategoriaDto
            {
                Categorias = categoriasComTotais,
                TotalGeralReceitas = categoriasComTotais.Sum(c => c.TotalReceitas),
                TotalGeralDespesas = categoriasComTotais.Sum(c => c.TotalDespesas),
                SaldoLiquidoGeral = categoriasComTotais.Sum(c => c.Saldo)
            };

            return Ok(relatorio);
        }
    }
}
