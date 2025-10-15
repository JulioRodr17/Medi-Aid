import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/images/logoMediAid.jpeg';

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo-link">
        <img src={logo} alt="Medi-Aid Logo" className="navbar-logo-img" />
        <span className="navbar-logo-text">Medi-Aid</span>
      </Link>
      <nav className="navbar-nav">
        {/* Usamos NavLink en lugar de Link para que podamos darle un estilo
            especial al enlace de la página que está activa. */}
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Inicio
        </NavLink>
        <NavLink to="/catalogo" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Catálogo
        </NavLink>
        <NavLink to="/donacion" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Donación
        </NavLink>
        <NavLink to="/perfil" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Perfil
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
