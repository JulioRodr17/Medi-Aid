import React, { useState } from 'react';
import MedicationCard from '../../../components/ui/MedicationCard/MedicationCard';
import Pagination from '../../../components/ui/Pagination/Pagination';
import './MedicationGrid.css';



const ITEMS_PER_PAGE = 8;

const MedicationGrid = ({ medications, onCardClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(medications.length / ITEMS_PER_PAGE);

  const currentMedications = medications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    // Añadimos validación para no ir a páginas que no existen
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (medications.length === 0) {
    return <p className="grid-empty-message">No se encontraron medicamentos.</p>;
  }

  return (
    <div className="medication-grid-wrapper">
      <div className="medication-grid">
        {currentMedications.map((med) => (
          <MedicationCard
            key={med.id}
            name={med.name}
            dosage={med.dosage}
            imageUrl={med.imageUrl}
            onClick={() => onCardClick(med)}
          />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MedicationGrid;

