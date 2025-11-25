import React from 'react';
import './EmptyState.css';

const EmptyState = ({
  icon = '📭',
  title = 'Sin registros',
  message,
  action,
  className = '',
  style,
}) => {
  return (
    <div className={`empty-state ${className}`.trim()} style={style}>
      <div className="empty-state-icon" aria-hidden="true">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {action && (
        <button className="empty-state-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

