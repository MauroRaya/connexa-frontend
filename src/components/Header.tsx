import { Link } from "react-router-dom";

type HeaderProps = {
  showNav?: boolean;
};

export default function Header({ showNav = false }: HeaderProps) {
  return (
    <header className="auth-header">
      <div className="header-content">
        <div className="logo">
          <h1>Conexxa</h1>
        </div>

        {showNav ? (
          <nav className="nav-links">
            <Link to="/groups">Listar grupos</Link>
            <Link to="/my-groups">Meus grupos</Link>
          </nav>
        ) : (
          <button className="btn-outline">← Voltar</button>
        )}
      </div>
    </header>
  );
}
