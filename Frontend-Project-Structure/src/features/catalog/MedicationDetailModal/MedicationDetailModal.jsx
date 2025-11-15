import React from 'react';
import './MedicationDetailModal.css';
import placeholderImage from '../../../assets/images/med-placeholder.png';

const MedicationDetailModal = ({ medication, onClose }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // El 'backdrop' es el fondo oscuro semitransparente. Al hacer clic en él, se cierra el modal.
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-button" onClick={onClose}>
          &times; {/* Este es el caracter de una 'X' */}
        </button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img 
              src={medication.imageUrl || placeholderImage} 
              alt={medication.name} 
              className="modal-image"
            />
          </div>
          <div className="modal-info">
            <h2 className="modal-title">{medication.name}</h2>
            <p className="modal-dosage">{medication.dosage}</p>
            <p className="modal-description">
              {medication.description || 'No hay descripción disponible.'}
            </p>
              <div className="modal-extra-details">
                <br />
                <span><strong>Categoría:</strong> {medication.category}</span>
                <br />
                <span><strong>Stock:</strong> {medication.stock}</span>
                
              </div>      
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetailModal;
