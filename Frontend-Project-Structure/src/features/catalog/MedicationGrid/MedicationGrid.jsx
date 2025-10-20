import React, { useState } from 'react';
import MedicationCard from '../../../components/ui/MedicationCard/MedicationCard';
import Pagination from '../../../components/ui/Pagination/Pagination';
import './MedicationGrid.css';

// --- Datos de Ejemplo ---
const allMedications = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Medicamento #${i + 1}`,
  dosage: `${Math.floor(Math.random() * 500) + 50} mg`,
  imageUrl: '',
}));

const ITEMS_PER_PAGE = 8;

const MedicationGrid = ({ onCardClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allMedications.length / ITEMS_PER_PAGE);

  const currentMedications = allMedications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    // Añadimos validación para no ir a páginas que no existen
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

      {/* 2. Reemplazamos los botones antiguos por nuestro nuevo componente,
          pasándole las props que necesita para funcionar. */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MedicationGrid;

