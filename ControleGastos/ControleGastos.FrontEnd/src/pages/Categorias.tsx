import { useState, useEffect } from 'react';

const TipoFinalidade = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3
} as const;

interface Categoria {
  id: number;
  descricao: string;
  finalidade: number; 
}

export function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState<number>(TipoFinalidade.Despesa);
  const [showModal, setShowModal] = useState(false);

  const carregarCategorias = () => {
    fetch('http://localhost:5078/api/Categoria')
      .then(res => res.json())
      .then(data => setCategorias(data))
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  // Função para limpar os campos.
  const limparFormulario = () => {
    setDescricao('');
    setFinalidade(TipoFinalidade.Despesa);
  };

  // Função para salvar o cadastro.
  const salvarCategoria = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:5078/api/Categoria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, finalidade })
    })
    .then(res => {
      if (res.ok) {
        limparFormulario();
        carregarCategorias();
        setShowModal(false);
      } else {
        alert("Erro ao salvar a categoria.");
      }
    });
  };

  const traduzirFinalidade = (tipo: number) => {
    switch (tipo) {
      case TipoFinalidade.Despesa: return <span className="badge bg-danger">Despesa</span>;
      case TipoFinalidade.Receita: return <span className="badge bg-success">Receita</span>;
      case TipoFinalidade.Ambas: return <span className="badge bg-primary">Ambas</span>;
      default: return "-";
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gerenciar Categorias</h2>
        <button className="btn btn-primary fw-bold" onClick={() => { limparFormulario(); setShowModal(true);}}>
          Cadastrar Categoria
        </button>
      </div>

      <table className="table table-hover border">
        <thead className="table-dark">
          <tr>
            <th style={{ width: '100px' }}>ID</th>
            <th>Descrição</th>
            <th style={{ width: '150px' }}>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
             <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.descricao}</td>
              <td>{traduzirFinalidade(c.finalidade)}</td>
            </tr>
          ))}
          {categorias.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-muted py-4">
                Nenhuma categoria cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Criação de um modal para CREATE das categorias */}
      {showModal && (
      <div className="modal show d-block modal-anim-fade" id="modalCategoria" tabIndex={-1}>
        <div className="modal-dialog modal-anim-slide">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title">Cadastrar Categoria</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <form onSubmit={salvarCategoria}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <input type="text" className="form-control" value={descricao} onChange={e => setDescricao(e.target.value)} required maxLength={400}/>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Finalidade</label>
                  <select 
                    className="form-select" 
                    value={finalidade} 
                    onChange={e => setFinalidade(Number(e.target.value))}
                    required
                  >
                    <option value={TipoFinalidade.Despesa}>Despesa</option>
                    <option value={TipoFinalidade.Receita}>Receita</option>
                    <option value={TipoFinalidade.Ambas}>Ambas</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary fw-bold">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
      {showModal && <div className="modal-backdrop show modal-anim-fade-backdrop"></div>}
    </div>
  );
}