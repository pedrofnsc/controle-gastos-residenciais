import { useState, useEffect } from 'react';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number>(0);
  const [idEdit, setIdEdit] = useState<number | null>(null);

  const carregarPessoas = () => {
    fetch('https://localhost:7224/api/Pessoa')
      .then(res => res.json())
      .then(data => setPessoas(data));
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  // Função para excluir o cadastro de uma pessoa.
  const excluirPessoa = (id: number) => {
    if (window.confirm("Deseja realmente excluir esta pessoa e suas transações?")) {
      fetch(`https://localhost:7224/api/Pessoa/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) carregarPessoas();
        });
    }
  };

  // Função para preparar uma pessoa para ir para o modal de edição.
  const prepararEdicao = (p: Pessoa) => {
    setIdEdit(p.id);
    setNome(p.nome);
    setIdade(p.idade);
  };

  // Função para limpar os campos.
  const limparFormulario = () => {
    setIdEdit(null);
    setNome('');
    setIdade(0);
  };

  // Função para salvar o cadastro ou a edição.
  const salvarPessoa = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dados = { nome, idade };
    const metodo = idEdit ? 'PUT' : 'POST';
    const url = idEdit ? `https://localhost:7224/api/Pessoa/${idEdit}` : 'https://localhost:7224/api/Pessoa';

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(idEdit ? { ...dados, id: idEdit } : dados)
    })
    .then(res => {
      if (res.ok) {
        limparFormulario();
        carregarPessoas();
        document.getElementById('btnFecharModal')?.click();
      } else {
        alert("Erro ao salvar os dados.");
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gerenciar Pessoas</h2>
        <button 
          className="btn btn-primary fw-bold" 
          data-bs-toggle="modal" 
          data-bs-target="#modalPessoa"
          onClick={limparFormulario}
        >
          Cadastrar Pessoa
        </button>
      </div>

      <table className="table table-hover border">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th className="text-center" style={{ width: '200px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.idade}</td>
              <td className="text-center">
                <button 
                  className="btn btn-sm btn-warning me-2 fw-bold" 
                  data-bs-toggle="modal" 
                  data-bs-target="#modalPessoa"
                  onClick={() => prepararEdicao(p)}
                >
                  Editar
                </button>
                <button className="btn btn-sm btn-danger fw-bold" onClick={() => excluirPessoa(p.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para CREATE e EDIT das pessoas */}
      <div className="modal fade" id="modalPessoa" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title">{idEdit ? "Editar Pessoa" : "Cadastrar Pessoa"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnFecharModal"></button>
            </div>
            <form onSubmit={salvarPessoa}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nome Completo</label>
                  <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} required maxLength={200} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Idade</label>
                  <input type="number" className="form-control" value={idade} onChange={e => setIdade(Number(e.target.value))} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-primary">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}