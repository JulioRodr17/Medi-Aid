import React, { useState } from 'react';
import './MedicationToolbar.css';

// --- Íconos SVG (sin cambios) ---
const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MedicationToolbar = ({ categories, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onFilterChange({ search: event.target.value, category: selectedCategory });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange({ search: searchTerm, category: event.target.value });
  };

  const toggleFilterMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="medication-toolbar">
      <div className="filter-wrapper">
        <button className="filter-button" onClick={toggleFilterMenu}>
          <FilterIcon />
          <span>Filtros</span>
        </button>

        {isMenuOpen && (
          <div className="filters-dropdown">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombreCategoria}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

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

