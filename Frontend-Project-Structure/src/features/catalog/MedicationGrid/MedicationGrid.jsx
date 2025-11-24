import React, { useState, useEffect} from 'react';
import MedicationCard from '../../../components/ui/MedicationCard/MedicationCard';
import Pagination from '../../../components/ui/Pagination/Pagination';
import './MedicationGrid.css';
import imgMed from '../../../assets/images/med-placeholder.png';

const MedicationGrid = ({ 
  medications, 
  currentPage, 
  totalPages, 
  onPageChange,
  onCardClick 
}) => {

  if (!medications || medications.length === 0) {
    return <p className="grid-empty-message">No se encontraron medicamentos.</p>;
  }

  return (
    <div className="medication-grid-wrapper">
      <div className="medication-grid">
        {medications.map((med) => (
          <MedicationCard
            key={med.id}
            name={med.nombreMedicamento}
            dosage={med.dosis}
            imageUrl={imgMed}
            onClick={() => onCardClick(med)}
          />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MedicationGrid;
