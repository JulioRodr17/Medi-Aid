import React from 'react';
import InfoCard from '../../../components/ui/infoCard/InfoCard';
import QuickLinks from '../QuickLinks/QuickLinks';
import Button from '../../../components/ui/button/Button';
import './HomeGrid.css';



const HomeGrid = ({ cards = [], isAdmin, onEdit }) => {
  return (
   <div className="home-grid-wrapper" style={{ position: 'relative', marginTop: '2rem' }}>
      
      {/* --- BOTÓN DE ADMIN --- */}
      {isAdmin && (
        <div style={{ position: 'absolute', top: '-40px', right: 0, zIndex: 10 }}>
          <Button variant="secondary" onClick={(e) => onEdit(e)} style={{ fontSize: '0.8rem' }}>
            ✏️ Editar Tarjetas
          </Button>
        </div>
      )}

      <div className="home-grid-container">
        {cards.map((card, index) => (
          <InfoCard
            key={card.id || index}
            icon={card.icon}
            title={card.title}
            text={card.text}
          />
        ))}
        <div className="grid-quick-links">
          <QuickLinks />
        </div>
      </div>
    </div>
  );
};

export default HomeGrid;