using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    public class Pessoa
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O Nome é obrigatório.")]
        [MaxLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "A Idade é obrigatória.")]
        [Range(0, 150, ErrorMessage = "A idade não pode ser negativa.")]
        public int Idade { get; set; }
    }
}
