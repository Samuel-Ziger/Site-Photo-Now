import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Photo Now</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/recursos">Recursos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/suporte">Suporte</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/noticias">Notícias</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/eventos">Eventos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contato">Contato</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
