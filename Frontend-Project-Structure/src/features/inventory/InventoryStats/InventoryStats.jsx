import React from 'react';
import './InventoryStats.css';

const InventoryStats = ({ stats }) => {
  // Guardia por si las stats aún no han cargado
  if (!stats) {
    return <div className="stats-grid loading">Cargando estadísticas...</div>;
  }

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-card-value">{stats.totalMeds}</span>
        <span className="stat-card-label">Medicamentos Totales</span>
      </div>
      <div className="stat-card">
        <span className="stat-card-value">{stats.typesOfMeds}</span>
        <span className="stat-card-label">Tipos de Medicamentos</span>
      </div>
      <div className="stat-card warning"> {/* Estilo de advertencia */}
        <span className="stat-card-value">{stats.scarceMedsCount}</span>
        <span className="stat-card-label">Medicamentos Escasos</span>
      </div>
      <div className="stat-card urgent">
        <span className="stat-card-value">{stats.expiringSoon}</span>
        <span className="stat-card-label">Próximos a Caducar</span>
      </div>
    </div>
  );
};

export default InventoryStats;