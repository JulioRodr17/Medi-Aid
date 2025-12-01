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
  const [categories, setCategories] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    page: 0,
    size: 8
  });

  useEffect(() => {
    const loadInitData = async () => {
      try {
        setLoading(true);

        const categoriesResponse = await medicationService.getCategories();
        const scarceResponse = await medicationService.getScarceMedications();

        setCategories(categoriesResponse);
        setScarceMeds(scarceResponse);
      } catch (err) {
        setError(err.message || 'Error cargando datos iniciales');
      } finally {
        setLoading(false);
      }
    };

    loadInitData();
  }, []); // <--- solo la primera vez

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const medsResponse = await medicationService.getMedWithPhoto(filters);
        console.log(scarceMeds);
        setMedications(medsResponse.data);
        setTotalPages(medsResponse.totalPages);

      } catch (err) {
        setError(err.message || 'Error cargando medicamentos');
      }
    };

    loadMedications();
  }, [filters]); // <--- solo recarga cuando cambian los filtros


  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 0 })); // Reset page al cambiar filtro
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleCardClick = (medicationData) => {
    setSelectedMedication(medicationData);
  };

  const handleCloseModal = () => setSelectedMedication(null);

  if (loading) return <div className="page-loading">Cargando catálogo...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="catalog-page">
      <ScarcityBanner scarceMeds={scarceMeds} />
      <h2 className="page-title">Medicamentos Disponibles</h2>

      <MedicationToolbar 
        categories={categories} 
        onFilterChange={handleFilterChange} 
      />

      <MedicationGrid 
        medications={medications}
        onCardClick={handleCardClick}
        currentPage={filters.page}
        totalPages={totalPages}   // viene de la respuesta del backend
        onPageChange={handlePageChange}
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

