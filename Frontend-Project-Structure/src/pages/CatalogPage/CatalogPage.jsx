import React, { useState } from 'react';
import './CatalogPage.css';

import ScarcityBanner from '../../features/catalog/ScarcityBanner/ScarcityBanner';
import MedicationToolbar from '../../features/catalog/MedicationToolbar/MedicationToolbar';
import MedicationGrid from '../../features/catalog/MedicationGrid/MedicationGrid';
import MedicationDetailModal from '../../features/catalog/MedicationDetailModal/MedicationDetailModal';

const CatalogPage = () => {
  // 1. Estado para guardar el medicamento seleccionado. 'null' significa que no hay modal visible.
  const [selectedMedication, setSelectedMedication] = useState(null);

  // 2. Función que se ejecutará cuando se haga clic en una tarjeta.
  // Recibe los datos del medicamento y los guarda en el estado.
  const handleCardClick = (medicationData) => {
    setSelectedMedication(medicationData);
  };

  // 3. Función para cerrar el modal.
  const handleCloseModal = () => {
    setSelectedMedication(null);
  };

  return (
    <div className="catalog-page">
      <ScarcityBanner />
      <h2 className="page-title">Medicamentos Disponibles</h2>
      <MedicationToolbar />

      {/* 4. Pasamos la función handleCardClick al componente de la galería. */}
      <MedicationGrid onCardClick={handleCardClick} />

      {/* 5. Renderizado Condicional: El modal solo se muestra si hay un medicamento seleccionado. */}
      {selectedMedication && (
        <MedicationDetailModal
          medication={selectedMedication}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CatalogPage;

