import React from 'react';
import './UserDonationStats.css';

// Un mini-componente interno para cada estadística
const StatBox = ({ value, label }) => (
  <div className="stat-box">
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const UserDonationStats = ({ total, pending, approved }) => {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Resumen de Donaciones</h3>
      <div className="stats-container">
        <StatBox value={total} label="Total de Donaciones" />
        <StatBox value={pending} label="Donaciones Pendientes" />
        <StatBox value={approved} label="Donaciones Aprobadas" />
      </div>
    </div>
  );
};

export default UserDonationStats;
