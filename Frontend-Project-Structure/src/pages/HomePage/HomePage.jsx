import React from 'react';
import './HomePage.css';

// Por ahora, solo tendrá placeholders. Más adelante agregaremos
// los componentes de Carousel, InfoCards, etc.
const HomePage = () => {
  return (
    <div className="home-page">
      <div className="placeholder-section" style={{ height: '400px', backgroundColor: '#e0e0e0' }}>
        <h2>Aquí irá el Image Carousel</h2>
      </div>
      <div className="placeholder-section" style={{ height: '300px', backgroundColor: '#f0f0f0' }}>
        <h2>Aquí irán las Info Cards</h2>
      </div>
      <div className="placeholder-section" style={{ height: '200px', backgroundColor: '#e0e0e0' }}>
        <h2>Aquí irá la sección de Redes Sociales</h2>
      </div>
    </div>
  );
};

export default HomePage;
