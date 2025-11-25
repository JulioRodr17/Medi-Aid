import React from 'react';
import './Spinner.css';

const Spinner = ({
  label = 'Cargando...',
  size = 36,
  color = '#2b7fff',
  trackColor = '#dfe6ff',
  className = '',
}) => {
  const circleStyle = {
    width: size,
    height: size,
    borderWidth: Math.max(3, Math.floor(size / 9)),
    borderColor: trackColor,
    borderTopColor: color,
  };

  return (
    <div className={`spinner-wrapper ${className}`.trim()} role="status" aria-live="polite">
      <div className="spinner-circle" style={circleStyle} />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
};

export default Spinner;

