import React from 'react';
import { products } from '../../data';
import './Gallery.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function getAllImages() {
  return products.flatMap(product => product.images);
}

const Gallery = () => {
  const images = getAllImages().slice(0, 10);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth <= 600 ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ],
    
  };

  return (
    <div className="gallery">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt="عرض باب" className="gallery-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery; 