import React from 'react';
import './InfoModal.css';

// Recibe 'onClose' para que el componente padre decida cómo cerrarlo.
const InfoModal = ({ title, message, onClose }) => {
  return (
    <div className="info-modal-backdrop" onClick={onClose}>
      <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="info-modal-icon">
          {/* Un ícono de check simple */}
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className="info-modal-title">{title}</h2>
        <p className="info-modal-message">{message}</p>
        <button className="info-modal-button" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
