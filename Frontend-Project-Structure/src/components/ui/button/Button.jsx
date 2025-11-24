import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  style = {}
}) => {
  const baseClass = `ui-button`; 
  const variantClass = `ui-button--${variant}`;
  const disabledClass = disabled ? 'ui-button--disabled' : '';

  const finalClasses = [baseClass, variantClass, disabledClass].join(' ');

  return (
    <button
      type={type}
      className={finalClasses}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;