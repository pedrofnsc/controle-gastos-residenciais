namespace ControleGastos.Api.DTO
{
    public class RelatorioTotaisPessoaDto
    {
        public List<TotaisPessoaDto> Pessoas { get; set; } = new List<TotaisPessoaDto>();
        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }
        public decimal SaldoLiquidoGeral { get; set; }
    }
}
