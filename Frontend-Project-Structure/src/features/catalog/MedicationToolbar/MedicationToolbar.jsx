import React, { useState } from 'react';
import './MedicationToolbar.css';

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

const CATEGORIES = [
  'Pastillas', 
  'Capsulas', 
  'Jarabes', 
  'Insumos'
];

const MedicationToolbar = ({ onSearch, onFilterSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilterLabel, setActiveFilterLabel] = useState('Todos');


  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log("Buscando:", searchTerm); // Para depurar
      onSearch(searchTerm);
    }
  };

  const handleFilterClick = (filterType, label) => {
    onFilterSelect(filterType); 
    setActiveFilterLabel(label);
    setIsMenuOpen(false);
  };

  return (
    <div className="medication-toolbar">
      <div className="filter-wrapper">
        <button 
          className={`filter-button ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FilterIcon />
          <span>Filtro: {activeFilterLabel}</span>
        </button>

        {isMenuOpen && (
          <div className="filters-dropdown">
            <ul>
              <li onClick={() => handleFilterClick('all', 'Todos')}>Todos</li>
              <li onClick={() => handleFilterClick('low_stock', 'Poco Stock (<10)')}>Poco Stock</li>
              
              <li className="filter-divider">Categorías</li>
              
              {CATEGORIES.map(cat => (
                <li key={cat} onClick={() => handleFilterClick(cat, cat)}>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="search-bar">
        <div className="search-icon-wrapper">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Buscar medicamento..."
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};


export default MedicationToolbar;

