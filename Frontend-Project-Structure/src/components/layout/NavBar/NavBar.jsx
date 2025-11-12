import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

import './Navbar.css';
import logo from '../../../assets/images/logoMediAid.jpeg';
import NotificationPanel from '../../../features/notifications/NotificationPanel/NotificationPanel.jsx';

// --- Íconos SVG (sin cambios) ---
const NotificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
// --- Fin de Íconos SVG ---


const Navbar = () => {
  const { user } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  // 2. Estado para la insignia (badge)
  // TODO: BACKEND
  // Este valor debe venir de una llamada a la API que
  // verifique si hay notificaciones no leídas.
  const [hasUnread, setHasUnread] = useState(true); // Puesto en 'true' para desarrollo
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 


  return (
    <header className="navbar">
      {/* --- Izquierda --- */}
      <Link to="/" className="navbar-logo-link">
        <img src={logo} alt="Medi-Aid Logo" className="navbar-logo-img" />
        <span className="navbar-logo-text">Medi-Aid</span>
      </Link>

      {/* --- Centro --- */}
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

        {isAdmin && (
          <NavLink to="/inventario" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Inventario
          </NavLink>
        )}
      </nav>

      {/* --- Derecha --- */}
      <div className="navbar-right">
        <div className="notification-wrapper" ref={notifRef}>
          <button
            className="navbar-icon-button"
            onClick={() => setIsNotifOpen(!isNotifOpen)} 
          >
            <NotificationIcon />
            {hasUnread && <span className="notification-badge"></span>}
          </button>
          
          {isNotifOpen && <NotificationPanel setHasUnread={setHasUnread} />}
        </div>

        <NavLink to="/perfil" className={({ isActive }) => (isActive ? 'nav-icon-link active' : 'nav-icon-link')}>
          <ProfileIcon />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;

