import { useState, useEffect } from 'react';
import { API_URL } from '../config/api.ts';

//#region Interfaces
interface PessoaTotal {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface ResumoPessoas {
  pessoas: PessoaTotal[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}

interface CategoriaTotal {
  descricao: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface ResumoCategorias {
  categorias: CategoriaTotal[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}
//#endregion

export function Totais() {
  const [resumoPessoas, setResumoPessoas] = useState<ResumoPessoas | null>(null);
  const [resumoCategorias, setResumoCategorias] = useState<ResumoCategorias | null>(null);

  // Buscas dos totais
  useEffect(() => {
    fetch(`${API_URL}/Pessoa/totais`)
      .then(res => res.json())
      .then(data => setResumoPessoas(data))
      .catch(err => console.error("Erro Pessoas:", err));

    fetch(`${API_URL}/Categoria/totais`)
      .then(res => res.json())
      .then(data => setResumoCategorias(data))
      .catch(err => console.error("Erro Categorias:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Totais por Pessoa</h2>
      <div className="table-responsive mb-5">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {resumoPessoas?.pessoas.map((p, i) => (
              <tr key={i}>
                <td>{p.nome}</td>
                <td className="text-success">R$ {p.totalReceitas.toFixed(2)}</td>
                <td className="text-danger">R$ {p.totalDespesas.toFixed(2)}</td>
                <td className={p.saldo >= 0 ? "text-primary fw-bold" : "text-danger fw-bold"}>
                  R$ {p.saldo.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-light fw-bold">
            <tr>
              <td>TOTAL GERAL</td>
              <td className="text-success">R$ {resumoPessoas?.totalGeralReceitas.toFixed(2) || '0.00'}</td>
              <td className="text-danger">R$ {resumoPessoas?.totalGeralDespesas.toFixed(2) || '0.00'}</td>
              <td>R$ {resumoPessoas?.saldoLiquidoGeral.toFixed(2) || '0.00'}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <hr className="my-5" />

      <h2 className="mb-3">Totais por Categoria</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Categoria</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {resumoCategorias?.categorias.map((c, i) => (
              <tr key={i}>
                <td>{c.descricao}</td>
                <td className="text-success">R$ {c.totalReceitas.toFixed(2)}</td>
                <td className="text-danger">R$ {c.totalDespesas.toFixed(2)}</td>
                <td className={c.saldo >= 0 ? "text-primary fw-bold" : "text-danger fw-bold"}>
                  R$ {c.saldo.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-light fw-bold">
            <tr>
              <td>TOTAL GERAL</td>
              <td className="text-success">R$ {resumoCategorias?.totalGeralReceitas.toFixed(2) || '0.00'}</td>
              <td className="text-danger">R$ {resumoCategorias?.totalGeralDespesas.toFixed(2) || '0.00'}</td>
              <td>R$ {resumoCategorias?.saldoLiquidoGeral.toFixed(2) || '0.00'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}