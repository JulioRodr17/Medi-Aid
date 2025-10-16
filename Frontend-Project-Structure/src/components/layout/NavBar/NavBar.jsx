import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/images/logoMediAid.jpeg';

const NotificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Navbar = () => {
  return (
    <header className="navbar">
      {/* Sección Izquierda: Logo y Nombre */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="Medi-Aid Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">Medi-Aid</span>
        </Link>
      </div>

      {/* Sección Central: Navegación Principal */}
      <nav className="navbar-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Inicio
        </NavLink>
        <NavLink to="/catalogo" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Catálogo
        </NavLink>
        <NavLink to="/donacion" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Donación
        </NavLink>
      </nav>

      {/* Sección Derecha: Íconos de Perfil y Notificaciones */}
      <div className="navbar-right">
        <NavLink to="/notificaciones" className="navbar-icon-button">
          <NotificationIcon />
        </NavLink>
        <NavLink to="/perfil" className="navbar-icon-button">
          <ProfileIcon />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
