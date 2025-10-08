import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false}) => {
  const mode = `ui-button--${variant}`; 
  const disabledClass = disabled ? 'ui-button--disabled' : '';

  return (
    <button
      type={type}
      className={['ui-button', mode, disabledClass].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
