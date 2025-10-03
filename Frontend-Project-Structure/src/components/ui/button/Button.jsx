import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const mode = `ui-button--${variant}`; // para estilos 'primary', 'secondary', etc.

  return (
    <button
      type={type}
      className={['ui-button', mode].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
