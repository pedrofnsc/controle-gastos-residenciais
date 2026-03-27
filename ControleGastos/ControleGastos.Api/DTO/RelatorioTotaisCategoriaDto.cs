namespace ControleGastos.Api.DTO
{
    public class RelatorioTotaisCategoriaDto
    {
        public List<TotaisCategoriaDto> Categorias { get; set; } = new List<TotaisCategoriaDto>();
        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }
        public decimal SaldoLiquidoGeral { get; set; }
    }
}
