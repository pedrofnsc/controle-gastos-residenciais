namespace ControleGastos.Api.DTO
{
    public class TotaisCategoriaDto
    {
        public string Descricao { get; set; } = string.Empty;
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }
}
