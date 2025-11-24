import React from 'react';
import './MedicationDetailModal.css';
import placeholderImage from '../../../assets/images/med-placeholder.png';

const MedicationDetailModal = ({ medication, onClose }) => {
  console.log(medication);
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
              alt={medication.nombreMedicamento}  
              className="modal-image"
            />
          </div>
          <div className="modal-info">
            <h2 className="modal-title">{medication.nombreMedicamento}</h2>
            <p className="modal-dosage">{medication.dosis}</p>
            <p className="modal-description">
              {medication.descripcion || 'No hay descripción disponible.'}
            </p>
              <div className="modal-extra-details">
                <br />
                <span><strong>Categoría:</strong> {medication.categoria.nombreCategoria}</span>
                <br />
                <span><strong>Stock:</strong> {medication.cantidadStock}</span>
                
              </div>      
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetailModal;
