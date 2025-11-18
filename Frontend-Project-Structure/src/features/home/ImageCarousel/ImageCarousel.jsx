import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';


import slide1 from '../../../assets/images/carousel/slide_1.jpg';
import slide2 from '../../../assets/images/carousel/slide_2.jpg';
import slide3 from '../../../assets/images/carousel/slide_3.jpg';

const images = [slide1, slide2, slide3];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setIsAutoPlaying(false);
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="carousel-container">
      <button onClick={goToPrevious} className="carousel-arrow left-arrow">
        &#10094;
      </button>
      <div className="carousel-slide-container">
        <div
          className="carousel-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img src={image} alt={`Slide ${index + 1}`} key={index} className="carousel-slide" />
          ))}
        </div>
      </div>
      <button onClick={goToNext} className="carousel-arrow right-arrow">
        &#10095;
      </button>
      <div className="carousel-dots">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`carousel-dot ${currentIndex === slideIndex ? 'active' : ''}`}
            onClick={() => goToSlide(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
