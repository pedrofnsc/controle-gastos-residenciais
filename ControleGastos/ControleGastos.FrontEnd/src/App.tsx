import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Totais } from './pages/Totais';
import { Pessoas } from './pages/Pessoas';
import { Categorias } from './pages/Categorias';
import { Transacoes } from './pages/Transacoes';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Controle de Gastos</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Totais</Link>
            <Link className="nav-link" to="/pessoas">Pessoas</Link>
            <Link className="nav-link" to="/categorias">Categorias</Link>
            <Link className="nav-link" to="/transacoes">Transações</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Totais />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/transacoes" element={<Transacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;