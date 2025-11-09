import React, { useState, useEffect } from 'react';
import './CatalogPage.css';

import { medicationService } from '../../services/medicationService';

import ScarcityBanner from '../../features/catalog/ScarcityBanner/ScarcityBanner';
import MedicationToolbar from '../../features/catalog/MedicationToolbar/MedicationToolbar';
import MedicationGrid from '../../features/catalog/MedicationGrid/MedicationGrid';
import MedicationDetailModal from '../../features/catalog/MedicationDetailModal/MedicationDetailModal';

const CatalogPage = () => {
  const [medications, setMedications] = useState([]);
  const [scarceMeds, setScarceMeds] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCatalogData = async () => {
      try {
        setLoading(true); 
        setError(null);

        // --- TODO: BACKEND ---
        // Aquí es donde llamamos a nuestros servicios (que usan los datos dummy).
        // Usamos Promise.all para que ambas peticiones se hagan al mismo tiempo.
        const [medsResponse, scarceResponse] = await Promise.all([
          medicationService.getMedications(),
          medicationService.getScarceMedications()
        ]);

        setMedications(medsResponse.data); // Asumiendo que getMedications() devuelve { data: [...] }
        setScarceMeds(scarceResponse);

      } catch (err) {
        console.error("Error al cargar datos del catálogo:", err);
        setError(err.message || 'No se pudieron cargar los datos.');
      } finally {
        // Pase lo que pase (éxito o error), dejamos de cargar
        setLoading(false);
      }
    };

    loadCatalogData(); // Ejecutamos la función
  }, []); 

  const handleCardClick = (medicationData) => {
    setSelectedMedication(medicationData);
  };

  const handleCloseModal = () => {
    setSelectedMedication(null);
  };

  if (loading) {
    // TODO: Reemplazar esto con un componente <Spinner /> bonito
    return <div className="page-loading">Cargando catálogo...</div>;
  }

  if (error) {
    return <div className="page-error">Error: {error}</div>;
  }


  return (
    <div className="catalog-page">
      <ScarcityBanner 
        scarceMeds={scarceMeds}
      />
      <h2 className="page-title">Medicamentos Disponibles</h2>
      <MedicationToolbar />

      <MedicationGrid 
        medications={medications} 
        onCardClick={handleCardClick} 
      />

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

