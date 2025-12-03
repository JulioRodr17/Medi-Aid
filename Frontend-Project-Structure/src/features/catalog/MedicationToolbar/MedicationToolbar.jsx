import React, { useState } from 'react';
import './MedicationToolbar.css';

// --- ÍCONOS ---
const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = ({ direction }) => (
  <span style={{ fontSize: '18px' }}>
    {direction === 'ASC' ? '⬆️' : '⬇️'}
  </span>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L16.65 16.65"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MedicationToolbar = ({ categories, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('nombreMedicamento');
  const [sortDirection, setSortDirection] = useState('ASC');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const emitFilters = (newData = {}) => {
    onFilterChange({
      search: searchTerm,
      category: selectedCategory,
      sortBy,
      sortDirection,
      ...newData
    });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    emitFilters({ search: value });
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    emitFilters({ category: value });
  };

  // SOLO cambia la dirección ASC / DESC
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    setSortDirection(newDirection);
    emitFilters({ sortDirection: newDirection });
  };

  // SOLO cambia el campo por el que se ordena
  const handleSortByChange = (field) => {
    setSortBy(field);
    emitFilters({ sortBy: field });
  };

  const toggleFilterMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="medication-toolbar">
      
      {/* BOTÓN FILTROS + FLECHA */}
      <div className="filter-wrapper">
        <button className="filter-button" onClick={toggleFilterMenu}>
          <FilterIcon />
          <span>Filtros</span>
        </button>

        {/* BOTÓN DE FLECHITA */}
        <button
          className="sort-direction-button"
          onClick={toggleSortDirection}
        >
          <ArrowIcon direction={sortDirection} />
        </button>

        {/* MENÚ */}
        {isMenuOpen && (
          <div className="filters-dropdown">

            {/* CATEGORÍA (SIGUE SIENDO SELECT) */}
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombreCategoria}
                </option>
              ))}
            </select>

            {/* ORDENAR POR (SOLO BOTONES) */}
            <div className="sort-buttons">
              <button
                className={sortBy === 'nombreMedicamento' ? 'active' : ''}
                onClick={() => handleSortByChange('nombreMedicamento')}
              >
                NOMBRE
              </button>

              <button
                className={sortBy === 'cantidadStock' ? 'active' : ''}
                onClick={() => handleSortByChange('cantidadStock')}
              >
                STOCK
              </button>

              <button
                className={sortBy === 'fechaCaducidad' ? 'active' : ''}
                onClick={() => handleSortByChange('fechaCaducidad')}
              >
                CADUCIDAD
              </button>
            </div>

          </div>
        )}
      </div>

      {/* SEARCH BAR (NO SE TOCA) */}
      <div className="search-bar">
        <div className="search-icon-wrapper">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Buscar medicamento por nombre..."
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default MedicationToolbar;
