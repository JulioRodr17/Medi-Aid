import React from 'react';
import './UserDonationStats.css';
import '../UserContactInfo/UserContactInfo.css'; 

// Un mini-componente interno para cada estadística
const StatBox = ({ value, label }) => (
  <div className="stat-box">
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const UserDonationStats = ({ total, pending, approved, rechazada }) => {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Resumen de Donaciones</h3>
      <div className="stats-container">
        <StatBox value={total} label="Total de Donaciones" />
        <StatBox value={approved} label="Donaciones Aprobadas" />
        <StatBox value={pending} label="Donaciones Pendientes" />
        <StatBox value={rechazada} label="Donaciones Rechazadas" />
      </div>
    </div>
  );
};

export default UserDonationStats;
