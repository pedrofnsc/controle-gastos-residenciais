using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "A Descrição é obrigatória.")]
        [MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "A Finalidade é obrigatória.")]
        public TipoFinalidade Finalidade { get; set; }
    }
}
