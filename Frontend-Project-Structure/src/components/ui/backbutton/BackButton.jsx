import React from 'react';
import './BackButton.css';

const BackButton = ({text="Regresar", onClick }) => {
  return (
    <button onClick={onClick} className="ui-back-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ui-back-button-icon"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span>{text}</span>
    </button>
  );
};

export default BackButton;
