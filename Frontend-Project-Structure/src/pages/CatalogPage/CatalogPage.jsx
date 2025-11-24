import React, { useState, useEffect } from 'react';
import './CatalogPage.css';

import { medicationService } from '../../services/medicationService';

import ScarcityBanner from '../../features/catalog/ScarcityBanner/ScarcityBanner';
import MedicationToolbar from '../../features/catalog/MedicationToolbar/MedicationToolbar';
import MedicationGrid from '../../features/catalog/MedicationGrid/MedicationGrid';
import MedicationDetailModal from '../../features/catalog/MedicationDetailModal/MedicationDetailModal';

const CatalogPage = () => {
    // --- Estado de Datos ---
  const [allMedications, setAllMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [scarceMeds, setScarceMeds] = useState([]);
  
  // --- Estado de Filtros ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // --- Estado de UI ---
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
        const [medsResponse, scarceResponse] = await Promise.all([
          medicationService.getMedications(),
          medicationService.getScarceMedications()
        ]);
        
        setAllMedications(medsResponse.data);
        setFilteredMedications(medsResponse.data);
        setScarceMeds(scarceResponse);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los datos.');
      } finally {
        setLoading(false);
      }
    };
    loadCatalogData();
  }, []);

  useEffect(() => {
    let result = allMedications;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(med => 
        med.name.toLowerCase().includes(lowerTerm)
      );
    }

    if (activeFilter !== 'all') {
      if (activeFilter === 'low_stock') {
        result = result.filter(med => med.stock < 10);
      } else {
        result = result.filter(med => med.category === activeFilter);
      }
    }

    setFilteredMedications(result);

  }, [searchTerm, activeFilter, allMedications]);

  const handleSearch = (term) => setSearchTerm(term);
  const handleFilterSelect = (filterType) => setActiveFilter(filterType);
  const handleCardClick = (med) => setSelectedMedication(med);
  const handleCloseModal = () => setSelectedMedication(null);


  if (loading) return <div className="page-loading">Cargando catálogo...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="catalog-page">
      <ScarcityBanner scarceMeds={scarceMeds} />
      <h2 className="page-title">Medicamentos Disponibles</h2>
      <MedicationToolbar 
        onSearch={handleSearch} 
        onFilterSelect={handleFilterSelect} 
      />

      <MedicationGrid 
        medications={filteredMedications} 
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

