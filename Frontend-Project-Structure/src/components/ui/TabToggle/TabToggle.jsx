import React from 'react';
import './TabToggle.css';

/**
 * Un componente de botón deslizante para cambiar entre dos opciones.
 * @param {string} option1 - Texto para la opción de la izquierda.
 * @param {string} option2 - Texto para la opción de la derecha.
 * @param {'option1' | 'option2'} activeOption - La opción que está activa actualmente.
 * @param {function} onToggle - Función que se llama con 'option1' o 'option2' cuando se hace clic.
 */

const TabToggle = ({ option1, option2, activeOption, onToggle }) => {
  return (
    <div className="tab-toggle-container">
      {/* El fondo deslizante que se anima */}
      <div
        className={`tab-toggle-slider ${activeOption === 'option2' ? 'right' : ''}`}
      />

      {/* Botón de la Opción 1 */}
      <button
        className={`tab-toggle-button ${activeOption === 'option1' ? 'active' : ''}`}
        onClick={() => onToggle('option1')}
      >
        {option1}
      </button>

      {/* Botón de la Opción 2 */}
      <button
        className={`tab-toggle-button ${activeOption === 'option2' ? 'active' : ''}`}
        onClick={() => onToggle('option2')}
      >
        {option2}
      </button>
    </div>
  );
};

export default TabToggle;
