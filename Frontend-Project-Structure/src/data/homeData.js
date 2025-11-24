// --- Simulación de la base de datos del Home ---

// Imágenes iniciales (puedes poner las rutas que tenías)
import slide1 from '../assets/images/carousel/slide_1.jpg';
import slide2 from '../assets/images/carousel/slide_2.jpg';
import slide3 from '../assets/images/carousel/slide_3.jpg';

let HOME_DATA = {
  carouselImages: [
    { id: 'img1', url: slide1, alt: 'Slide 1' },
    { id: 'img2', url: slide2, alt: 'Slide 2' },
    { id: 'img3', url: slide3, alt: 'Slide 3' },
  ],
  infoCards: [
    { id: 'c1', icon: '📰', title: 'Noticias Recientes', text: 'Mantente al día con las últimas novedades y comunicados.' },
    { id: 'c2', icon: '🤝', title: 'Programas de Apoyo', text: 'Descubre los programas y campañas activas.' },
    { id: 'c3', icon: '❤️', title: 'Consejos de Salud', text: 'Artículos y guías para cuidar tu bienestar.' },
    { id: 'c4', icon: '📄', title: 'Documentos Oficiales', text: 'Accede a reglamentos, guías y otros documentos.' },
  ]
};

// --- Simulación de la API ---

export const simulateGetHomeContent = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...HOME_DATA }); // Devolvemos una copia
    }, 500);
  });
};

export const simulateUpdateCarousel = (newImages) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulando API: Actualizando carrusel...", newImages);
      HOME_DATA.carouselImages = newImages;
      resolve(newImages);
    }, 600);
  });
};

export const simulateUpdateInfoCards = (newCards) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulando API: Actualizando tarjetas...", newCards);
      HOME_DATA.infoCards = newCards;
      resolve(newCards);
    }, 600);
  });
};