import React from 'react';
import './StatusIcon.css';

// --- Íconos SVG para los estados ---
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const RejectedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const StatusIcon = ({ status }) => {
  let icon = null;
  switch (status) {
    case 'APROBADA':
      icon = <CheckIcon />;
      break;
    case 'PENDIENTE':
      icon = <PendingIcon />;
      break;
    case 'RECHAZADA':
      icon = <RejectedIcon />;
      break;
    default:
      icon = null;
  }

  return (
    <div className={`status-icon ${status}`}>
      {icon}
    </div>
  );
};

export default StatusIcon;
