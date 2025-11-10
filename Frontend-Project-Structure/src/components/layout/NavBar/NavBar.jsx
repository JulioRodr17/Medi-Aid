import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
  // --- Estados ---
  // 1. Estado para el panel de notificaciones
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // 2. Estado para la insignia (badge)
  // TODO: BACKEND
  // Este valor debe venir de una llamada a la API que
  // verifique si hay notificaciones no leídas.
  const [hasUnread, setHasUnread] = useState(true); // Puesto en 'true' para desarrollo

  // --- Ref para Clic-Fuera ---
  // 3. Referencia al contenedor de la campana y el panel
  const notifRef = useRef(null);

  // --- Lógica de Clic-Fuera ---
  useEffect(() => {
    // Función que se ejecuta en CUALQUIER clic del documento
    const handleClickOutside = (event) => {
      // Si el panel está abierto (notifRef.current existe)
      // Y si el clic NO fue dentro del área del panel (notifRef.current.contains)
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false); // Cierra el panel
      }
    };
    // Añadir el listener al documento
    document.addEventListener("mousedown", handleClickOutside);
    // Limpiar el listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // El array vacío [] asegura que esto solo se ejecute al montar/desmontar


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
        <NavLink to="catalogo" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Catálogo
        </NavLink>
        <NavLink to="donacion" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Donación
        </NavLink>
      </nav>

      {/* --- Derecha --- */}
      <div className="navbar-right">
        {/* 4. Contenedor de Notificaciones (con la Ref) */}
        <div className="notification-wrapper" ref={notifRef}>
          {/* 5. El botón de la campana AHORA ES UN <button> */}
          <button
            className="navbar-icon-button"
            onClick={() => setIsNotifOpen(!isNotifOpen)} // Alterna el estado del panel
          >
            <NotificationIcon />
            {/* 6. Renderizado condicional de la insignia */}
            {hasUnread && <span className="notification-badge"></span>}
          </button>
          
          {/* 7. Renderizado condicional del panel */}
          {isNotifOpen && <NotificationPanel setHasUnread={setHasUnread} />}
        </div>

        {/* 8. El botón de perfil sigue siendo un <NavLink> */}
        <NavLink to="perfil" className={({ isActive }) => (isActive ? 'nav-icon-link active' : 'nav-icon-link')}>
          <ProfileIcon />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;

