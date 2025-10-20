import React from 'react';
import './ScarcityBanner.css';

// --- Ícono SVG para la mascota preocupada ---
// En el futuro, puedes reemplazar esto con tu propia ilustración o archivo SVG importado.
const WorriedMascot = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Placeholder SVG of a worried face */}
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3921f2" strokeWidth="2"/>
    <path d="M8 14C8.91362 12.8393 10.3663 12.125 12 12.125C13.6337 12.125 15.0864 12.8393 16 14" stroke="#3921f2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 9.01L9.01 8.99889" stroke="#3921f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 9.01L15.01 8.99889" stroke="#3921f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const ScarcityBanner = () => {
  // En un futuro, esta lista vendrá del backend.
  const scarceMedications = ['Paracetamol', 'Amoxicilina', 'Ibuprofeno', 'Loratadina', 'Omeprazol'];

  return (
    <div className="scarcity-banner">
      <div className="banner-content">
        <h2 className="banner-title">Medicamentos Escasos</h2>
        <div className="medications-list">
          {scarceMedications.map((med) => (
            <span key={med} className="med-tag">
              {med}
            </span>
          ))}
        </div>
      </div>
      <div className="banner-mascot">
        <WorriedMascot />
      </div>
    </div>
  );
};

export default ScarcityBanner;
