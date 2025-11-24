import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { homeService } from '../../services/homeService';


import ImageCarousel from '../../features/home/ImageCarousel/ImageCarousel';
import HomeGrid from '../../features/home/HomeGrid/HomeGrid';
import Modal from '../../components/ui/Modal/Modal';
import EditCarouselModal from '../../features/home/EditHomeModals/EditCarouselModal';
import EditInfoCardsModal from '../../features/home/EditHomeModals/EditInfoCardsModal';

// Datos iniciales dummy para las cards (por si falla el back)
const INITIAL_CARDS = [
  { id: 'c1', icon: '📰', title: 'Noticias', text: 'Mantente al día.' },
  { id: 'c2', icon: '🤝', title: 'Apoyo', text: 'Programas activos.' },
  { id: 'c3', icon: '❤️', title: 'Salud', text: 'Consejos de bienestar.' },
  { id: 'c4', icon: '📄', title: 'Documentos', text: 'Guías oficiales.' },
];

const HomePage = () => {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Estados de Datos
  const [homeData, setHomeData] = useState({ 
    carouselImages: [], 
    infoCards: [] 
  });
  const [loading, setLoading] = useState(true);
  
  // Estados de Modales
  const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
  const [isCardsModalOpen, setIsCardsModalOpen] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Llamamos al servicio correcto que devuelve { carouselImages, infoCards }
        const data = await homeService.getHomeContent();
        
        // Guardamos todo en el estado
        setHomeData(data);

      } catch (error) {
        console.error('Error cargando home:', error);
      } finally {
        setLoading(false);
      }
    };
    
    cargarDatos();
  }, []);

  // Handlers de Guardado (Simulados por ahora)
  const handleSaveCarousel = (newImages) => {
    console.log("Guardando carrusel...", newImages);
    setHomeData(prev => ({ ...prev, carouselImages: newImages }));
    setIsCarouselModalOpen(false);
  };

  const handleSaveCards = (newCards) => {
    console.log("Guardando cards...", newCards);
    setHomeData(prev => ({ ...prev, infoCards: newCards }));
    setIsCardsModalOpen(false);
  };

  if (authLoading || loading) {
    return <div className="page-loading">Cargando contenido...</div>;
  }

  return (
    <div className="home-page">
      {/* Carrusel Controlado */}
      <ImageCarousel 
        noticias={homeData.carouselImages} // Le pasamos el array de imágenes
        isAdmin={isAdmin} 
        onEdit={(e) => {
            e.stopPropagation();
            setIsCarouselModalOpen(true);
        }} 
      />
      
      {/* Grid Controlado */}
      <HomeGrid 
        cards={homeData.infoCards} 
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
