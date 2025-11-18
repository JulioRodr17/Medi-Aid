import React from 'react';
import './MedicationCard.css';

import placeholderImage from '../../../assets/images/med-placeholder.png';

// 1. Añadimos 'onClick' a la lista de props que recibe el componente.
const MedicationCard = ({ name, dosage, imageUrl, onClick }) => {
  return (
    // 2. Asignamos la prop 'onClick' al evento onClick del div principal.
    <div className="medication-card" onClick={onClick}>
      <div className="medication-card-image-container">
        <img
          src={imageUrl || placeholderImage}
          alt={name}
          className="medication-card-image"
        />
      </div>
      <div className="medication-card-info">
        <h4 className="medication-card-name">{name}</h4>
        <p className="medication-card-dosage">{dosage}</p>
      </div>
    </div>
  );
};

export default MedicationCard;

