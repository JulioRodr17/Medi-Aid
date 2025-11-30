import { httpClient } from './httpClient';
import { notificationService } from './notificationService';
import { 
  simulateUpdateInfoCards 
} from '../data/homeData';

const USE_DUMMY_DATA = true;

const getCarousel = async (inactivas = false) => {
  const data = await notificationService.obtenNoticias(inactivas);
  data.sort((a, b) => a.orden - b.orden);

  const noticiasConSrc = await Promise.all(
    data.map(async (n) => {
      const src = await httpClient.getImage(n.url);
      return { ...n, src };
    })
  );

  return noticiasConSrc;
};

const getCards = async (inactivas = false) => {
  const data = await notificationService.obtenCards(inactivas);
  data.sort((a, b) => a.orden - b.orden);

  return data;
};

const updateCarousel = (formData) => {
  return httpClient.put('/noticias/actualiza', formData );
};

const newCarousel = (formData) => {
  return httpClient.post('/noticias/nueva', formData);
};

const updateCards = (cards) => {
  return httpClient.put('/noticias/cards', cards );
};

export const homeService = {
  getCarousel,
  getCards,
  newCarousel,
  updateCarousel,
  updateCards,
};