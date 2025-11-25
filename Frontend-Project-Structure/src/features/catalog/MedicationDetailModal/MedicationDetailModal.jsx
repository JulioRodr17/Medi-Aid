import React from 'react';
import './MedicationDetailModal.css';
import placeholderImage from '../../../assets/images/med-placeholder.png';

const MedicationDetailModal = ({ medication, onClose }) => {
  const displayName = medication.nombreMedicamento || medication.name || 'Medicamento';
  const displayDosage = medication.dosis || medication.dosage || 'N/A';
  const displayDescription = medication.descripcion || medication.description || 'No hay descripción disponible.';
  const displayCategory = medication.categoria?.nombreCategoria || medication.category || 'Sin categoría';
  const displayStock = medication.cantidadStock ?? medication.stock ?? 'N/A';
  const displayImage = medication.imageUrl || placeholderImage;

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
              src={displayImage} 
              alt={displayName}  
              className="modal-image"
            />
          </div>
          <div className="modal-info">
            <h2 className="modal-title">{displayName}</h2>
            <p className="modal-dosage">{displayDosage}</p>
            <p className="modal-description">{displayDescription}</p>
              <div className="modal-extra-details">
                <br />
                <span><strong>Categoría:</strong> {displayCategory}</span>
                <br />
                <span><strong>Stock:</strong> {displayStock}</span>
                
              </div>      
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetailModal;
