import { httpClient } from './httpClient';
import { 
  simulateGetHomeContent, 
  simulateUpdateCarousel, 
  simulateUpdateInfoCards 
} from '../data/homeData';

const USE_DUMMY_DATA = true;

const getHomeContent = () => {
  if (USE_DUMMY_DATA) {
    return simulateGetHomeContent();
  }
  return httpClient.get('/home/content');
};

const updateCarousel = (images) => {
  if (USE_DUMMY_DATA) {
    return simulateUpdateCarousel(images);
  }
  return httpClient.put('/admin/home/carousel', { images });
};

const updateInfoCards = (cards) => {
  if (USE_DUMMY_DATA) {
    return simulateUpdateInfoCards(cards);
  }
  return httpClient.put('/admin/home/infocards', { cards });
};

export const homeService = {
  getHomeContent,
  updateCarousel,
  updateInfoCards,
};