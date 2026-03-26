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
            #region Validações
            var pessoa = await context.Pessoas.FindAsync(transacao.PessoaId);
            var categoria = await context.Categorias.FindAsync(transacao.CategoriaId);

            if (pessoa == null) return BadRequest("Pessoa não encontrada.");
            if (categoria == null) return BadRequest("Categoria não encontrada.");

            if (!IsIdadeValida(pessoa, transacao))
                return BadRequest("Menores de idade só podem registrar despesas.");

            if (!IsCategoriaValida(categoria, transacao)) 
                return BadRequest("O tipo da transação é incompatível com a finalidade da categoria.");
            #endregion

            context.Transacoes.Add(transacao);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
        }

        private bool IsIdadeValida(Pessoa pessoa, Transacao transacao) // Caso o usuário informe um menor de idade (menor de 18), apenas despesas deverão ser aceitas.
        {
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                return false;

            return true;
        }

        private bool IsCategoriaValida(Categoria categoria, Transacao transacao) // Restringir a utilização de categorias conforme o valor definido no campo finalidade.
        {
            if ((transacao.Tipo == TipoTransacao.Despesa && categoria.Finalidade == TipoFinalidade.Receita) || 
                (transacao.Tipo == TipoTransacao.Receita && categoria.Finalidade == TipoFinalidade.Despesa)) 
            {
                return false;
            }

            return true;
        }
    }
}
