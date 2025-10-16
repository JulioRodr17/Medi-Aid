import React from 'react';
import InfoCard from '../../../components/ui/infoCard/InfoCard';
import QuickLinks from '../QuickLinks/QuickLinks';
import './HomeGrid.css';

// Datos para las tarjetas (esto en un futuro vendría del backend)
const cardsData = [
  { icon: '📰', title: 'Lorem Ipsum', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { icon: '🤝', title: 'Lorem Ipsum', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { icon: '❤️', title: 'Lorem Ipsum', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { icon: '📄', title: 'Lorem Ipsum', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

const HomeGrid = () => {
  return (
    <div className="home-grid-container">
      {cardsData.map((card, index) => (
        <InfoCard
          key={index}
          icon={card.icon}
          title={card.title}
          text={card.text}
        />
      ))}
      <div className="grid-quick-links">
        <QuickLinks />
      </div>
    </div>
  );
};

export default HomeGrid;
