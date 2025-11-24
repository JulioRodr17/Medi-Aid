import React, { useState, useEffect } from 'react';
import { notificationService } from '../../../services/notificationService';
import { httpClient   } from '../../../services/httpClient';
import './ImageCarousel.css';
import Button from '../../../components/ui/button/Button';


const ImageCarousel = ({noticias = [],isAdmin, onEdit }) => {
  //const [noticias, setNoticias] = useState([]); // <-- AQUÍ GUARDAMOS LAS NOTICIAS
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // ================================
  // Cargar noticias desde el backend
  // ================================
  // useEffect(() => {
  //   const cargarNoticias = async () => {
  //     try {
  //       const data = await notificationService.obtenNoticias();
  //       data.sort((a, b) => a.orden - b.orden);

  //       // Convertir las URLs de cada noticia usando httpClient.getImage
  //       const noticiasConSrc = await Promise.all(
  //         data.map(async (n) => {
  //           const src = await httpClient.getImage(n.url);  // usa tu función genérica
  //           return { ...n, src };
  //         })
  //       );

  //       setNoticias(noticiasConSrc);
  //     } catch (error) {
  //       console.error('Error cargando noticias:', error);
  //     }
  //   };

  //   cargarNoticias();
  // }, []);


  // ================================
  // Autoplay del carrusel
  // ================================
  useEffect(() => {
    if (noticias.length === 0) return;

    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const isLastSlide = currentIndex === noticias.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, noticias]);

  // ================================
  // Navegación manual
  // ================================
  const goToPrevious = () => {
    if (noticias.length === 0) return;
    setIsAutoPlaying(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? noticias.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (noticias.length === 0) return;
    setIsAutoPlaying(false);
    const isLastSlide = currentIndex === noticias.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setIsAutoPlaying(false);
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="carousel-container">

      {isAdmin && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 20 }}>
          <Button variant="secondary" onClick={(e) => onEdit(e)} style={{ backgroundColor: 'white', opacity: 0.9 }}>
            ✏️ Editar Carrusel
          </Button>
        </div>
      )}

      {noticias.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>No hay noticias para mostrar.</p>
      ) : (
        <>
          <button onClick={goToPrevious} className="carousel-arrow left-arrow">&#10094;</button>

          <div className="carousel-slide-container">
            <div
              className="carousel-slides"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {noticias.map((n) => (
                <img
                  key={n.id}
                  src={n.url || n.src} 
                  alt={n.alt || n.titulo || 'Imagen de carrusel'}
                  className="carousel-slide"
                />
              ))}
            </div>
          </div>

          <button onClick={goToNext} className="carousel-arrow right-arrow">&#10095;</button>

          <div className="carousel-dots">
            {noticias.map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-dot ${currentIndex === slideIndex ? 'active' : ''}`}
                onClick={() => goToSlide(slideIndex)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
