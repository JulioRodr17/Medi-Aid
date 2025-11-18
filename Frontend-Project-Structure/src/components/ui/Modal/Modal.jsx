import React from 'react';
import './Modal.css';

// --- Icono de Cierre (X) ---
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

/**
 * Un componente Modal reutilizable.
 * @param {boolean} isOpen - Controla si el modal está visible.
 * @param {function} onClose - Función que se llama para cerrar el modal.
 * @param {string} title - El título que se mostrará en el encabezado.
 * @param {React.ReactNode} children - El contenido que se mostrará dentro del modal.
 */

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null; // Si no está abierto, no renderiza nada.
  }

  // Evita que el clic en el contenido cierre el modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // El 'backdrop' es el fondo oscuro
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={handleContentClick}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">
          {children} {/* Aquí se renderizará nuestro formulario */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
