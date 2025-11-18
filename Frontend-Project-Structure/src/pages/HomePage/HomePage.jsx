import React from 'react';
import './HomePage.css';

import ImageCarousel from '../../features/home/ImageCarousel/ImageCarousel';
import HomeGrid from '../../features/home/HomeGrid/HomeGrid';

const HomePage = () => {
  return (
    <div className="home-page">
      <h2>Anuncios Recientes</h2>
      <div className="placeholder-section">
        <ImageCarousel />
      </div>
      <h2>Informacion importante</h2>
      <div className="placeholder-section">
        <HomeGrid />
      </div>
    </div>
  );
};

export default HomePage;
