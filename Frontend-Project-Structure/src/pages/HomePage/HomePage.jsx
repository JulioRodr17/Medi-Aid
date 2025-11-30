import React, { useState, useEffect, useCallback } from 'react';
import './HomePage.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { homeService } from '../../services/homeService';


import ImageCarousel from '../../features/home/ImageCarousel/ImageCarousel';
import HomeGrid from '../../features/home/HomeGrid/HomeGrid';
import Modal from '../../components/ui/Modal/Modal';
import EditCarouselModal from '../../features/home/EditHomeModals/EditCarouselModal';
import EditInfoCardsModal from '../../features/home/EditHomeModals/EditInfoCardsModal.jsx';
import Spinner from '../../components/ui/Spinner/Spinner';
import EmptyState from '../../components/ui/EmptyState/EmptyState';

const HomePage = () => {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = user.admin;

  // Estados de Datos
  const [homeData, setHomeData] = useState({ 
    carouselImages: [], 
    infoCards: [] 
  });
  const [noticias, setNoticias] = useState();
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de Modales
  const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
  const [isCardsModalOpen, setIsCardsModalOpen] = useState(false);

  const loadHomeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dataNoticias = await homeService.getCarousel();
      const dataCards = await homeService.getCards();

      setNoticias(dataNoticias);
      setCards(dataCards);
    } catch (error) {
      console.error('Error cargando home:', error);
      setError(error.message || 'No se pudo cargar el contenido.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  const handleSaveCarousel = async (formData, mode) => {
    try {
      if (mode === 'add') await homeService.newCarousel(formData);
      else await homeService.updateCarousel(formData);

      const dataNoticias = await homeService.getCarousel();
      setNoticias(dataNoticias);
      setIsCarouselModalOpen(false);
    } catch (error) {
      console.error("Error al guardar el carrusel:", error);
      alert("No se pudo guardar el carrusel");
    }
  };


const handleSaveCards = async (newCards) => {
  try {
    // Llamada al backend para actualizar las cards
    await homeService.updateCards(newCards);

    const dataCards = await homeService.getCards();
    setCards(dataCards);
    
    // Cerrar modal
    setIsCardsModalOpen(false);
  } catch (error) {
    console.error("Error al guardar las cards:", error);
    alert("No se pudo guardar las tarjetas.");
  }
};


  if (authLoading || loading) {
    return <Spinner label="Cargando contenido..." />;
  }

  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        title="No pudimos cargar la página de inicio"
        message={error}
        action={{ label: 'Reintentar', onClick: loadHomeData }}
      />
    );
  }

  return (
    <div className="home-page">
      {/* Carrusel Controlado */}
      <ImageCarousel 
        noticias={noticias} // Le pasamos el array de imágenes
        isAdmin={isAdmin} 
        onEdit={(e) => {
            e.stopPropagation();
            setIsCarouselModalOpen(true);
        }} 
      />
      
      {/* Grid Controlado */}
      <HomeGrid 
        cards={cards} 
        isAdmin={isAdmin} 
        onEdit={(e) => {
            e.stopPropagation(); 
            setIsCardsModalOpen(true);}}
      />
      
      <div className="placeholder-section" style={{ height: '20px' }}></div> 

      {/* --- MODALES --- */}
      <Modal 
        title="Editar Noticias (Carrusel)" 
        isOpen={isCarouselModalOpen} 
        onClose={() => setIsCarouselModalOpen(false)}
      >
        <EditCarouselModal 
          currentData={homeData.carouselImages} 
          onSave={handleSaveCarousel} 
          onCancel={() => setIsCarouselModalOpen(false)} 
        />
      </Modal>

      <Modal 
        title="Editar Tarjetas Informativas" 
        isOpen={isCardsModalOpen} 
        onClose={() => setIsCardsModalOpen(false)}
      >
        <EditInfoCardsModal 
          currentData={homeData.infoCards} 
          onSave={handleSaveCards} 
          onCancel={() => setIsCardsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default HomePage;