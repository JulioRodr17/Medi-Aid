import React from 'react';
import './InfoCard.css';

const InfoCard = ({ icon, title, text }) => {
  return (
    <div className="info-card">
      <div className="info-card-icon">{icon}</div>
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-text">{text}</p>

    </div>
  );
};

export default InfoCard;
