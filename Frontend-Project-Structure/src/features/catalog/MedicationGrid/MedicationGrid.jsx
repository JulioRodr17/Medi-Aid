import React from 'react';
import MedicationCard from '../../../components/ui/MedicationCard/MedicationCard';
import Pagination from '../../../components/ui/Pagination/Pagination';
import EmptyState from '../../../components/ui/EmptyState/EmptyState';
import './MedicationGrid.css';
import imgMed from '../../../assets/images/med-placeholder.png';

const MedicationGrid = ({ 
  medications, 
  currentPage, 
  totalPages, 
  onPageChange,
  onCardClick 
}) => {
  const hasPagination = typeof onPageChange === 'function' && Number.isFinite(currentPage) && Number.isFinite(totalPages);

  if (!medications || medications.length === 0) {
    return (
      <div className="medication-grid-empty">
        <EmptyState 
          title="Sin resultados"
          message="Intenta ajustar la búsqueda o los filtros."
          icon="🩺"
        />
      </div>
    );
  }

  return (
    <div className="medication-grid-wrapper">
      <div className="medication-grid">
        {medications.map((med) => (
          <MedicationCard
            key={med.id}
            name={med.nombreMedicamento || med.name}
            dosage={med.dosis || med.dosage}
            imageUrl={imgMed}
            onClick={() => onCardClick(med)}
          />
        ))}
      </div>
      
      {hasPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default MedicationGrid;
