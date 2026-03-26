using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.Api.Models
{
    public class Transacao
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "A Descrição é obrigatória.")]
        [MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O Valor é obrigatório.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser um número positivo.")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "O Tipo é obrigatório.")]
        public TipoTransacao Tipo { get; set; }

        [Required(ErrorMessage = "A Categoria é obrigatória.")]
        public int CategoriaId { get; set; }

        [ForeignKey("CategoriaId")]
        public Categoria? Categoria { get; set; }

        [Required(ErrorMessage = "A Pessoa é obrigatória.")]
        public int PessoaId { get; set; }

        [ForeignKey("PessoaId")]
        public Pessoa? Pessoa { get; set; }
    }
}
