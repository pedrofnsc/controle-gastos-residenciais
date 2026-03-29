import { useState, useEffect } from 'react';

//#region Enums para um melhor entendimento do código
const TipoFinalidade = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3
} as const;

const TipoTransacao = {
  Despesa: 1,
  Receita: 2
} as const;
//#endregion

//#region Interfaces
interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

interface Categoria {
  id: number;
  descricao: string;
  finalidade: number;
}

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: number; 
  pessoaId: number;
  categoriaId: number;
}
//#endregion

export function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<number>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const [resT, resP, resC] = await Promise.all([
      fetch('https://localhost:7224/api/Transacao'),
      fetch('https://localhost:7224/api/Pessoa'),
      fetch('https://localhost:7224/api/Categoria')
    ]);

    setTransacoes(await resT.json());
    setPessoas(await resP.json());
    setCategorias(await resC.json());
  };  

  //#region Filtros das regras de negócio.
  const pessoasFiltradas = tipo === TipoFinalidade.Receita ? pessoas.filter(p => p.idade >= 18) : pessoas; //Selecionar somente maiores de 18 anos nos dropdowns.


  const categoriasFiltradas = categorias.filter(c => {  //Selecionar as Categorias dos seus respectivos tipos nos dropdowns.
    if (tipo === TipoTransacao.Receita){
        return c.finalidade === TipoFinalidade.Receita || c.finalidade === TipoFinalidade.Ambas;
    }
        
    return c.finalidade === TipoFinalidade.Despesa || c.finalidade === TipoFinalidade.Ambas;
  });
  //#endregion

  const salvarTransacao = (e: React.FormEvent) => {
    e.preventDefault();

    // Função para criar uma nova Transação
    const novaTransacao = { descricao, valor, tipo, pessoaId, categoriaId };

    fetch('https://localhost:7224/api/Transacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTransacao)
    }).then(res => {
      if (res.ok) {
        limparFormulario();
        carregarDados();
        document.getElementById('btnFecharModalTransacao')?.click();
      }
    });
  };

  // Função para limpar os campos.
  const limparFormulario = () => {
    setDescricao('');
    setValor(0);
    setTipo(TipoTransacao.Despesa);
    setPessoaId(0);
    setCategoriaId(0);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gerenciar Transações</h2>
        <button className="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#modalTransacao" onClick={limparFormulario}>
          Cadastrar Transação
        </button>
      </div>

      <table className="table table-hover border">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Pessoa</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.descricao}</td>
              <td>{pessoas.find(p => p.id === t.pessoaId)?.nome}</td>
              <td>{categorias.find(c => c.id === t.categoriaId)?.descricao}</td>
              <td>
                <span className={`badge ${t.tipo === TipoFinalidade.Receita ? 'bg-success' : 'bg-danger'}`}>
                  {t.tipo === TipoFinalidade.Receita ? 'Receita' : 'Despesa'}
                </span>
              </td>
              <td className={`fw-bold ${t.tipo === TipoFinalidade.Receita ? 'text-success' : 'text-danger'}`}>
                R$ {t.valor.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para CREATE das transações */}
      <div className="modal fade" id="modalTransacao" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title">Cadastrar Transação</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnFecharModalTransacao"></button>
            </div>
            <form onSubmit={salvarTransacao}>
              <div className="modal-body">
                
                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <input type="text" className="form-control" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Valor</label>
                    <input type="number" step="0.01" min="0.01" className="form-control" value={valor || ''} onChange={e => setValor(Number(e.target.value))} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tipo</label>
                    <select className="form-select" value={tipo} onChange={e => {
                      setTipo(Number(e.target.value));
                      setPessoaId(0); 
                      setCategoriaId(0);
                    }}>
                      <option value={1}>Despesa</option>
                      <option value={2}>Receita</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Pessoa</label>
                  <select className="form-select" value={pessoaId} onChange={e => setPessoaId(Number(e.target.value))} required>
                    <option value={0}>Selecione uma pessoa...</option>
                    {pessoasFiltradas.map(p => (
                      <option key={p.id} value={p.id}>{p.nome} ({p.idade} anos)</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <select className="form-select" value={categoriaId} onChange={e => setCategoriaId(Number(e.target.value))} required>
                    <option value={0}>Selecione uma categoria...</option>
                    {categoriasFiltradas.map(c => (
                      <option key={c.id} value={c.id}>{c.descricao}</option>
                    ))}
                  </select>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-primary fw-bold" disabled={pessoaId === 0 || categoriaId === 0}>
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}