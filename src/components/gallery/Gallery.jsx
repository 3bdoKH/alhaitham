import React, { useEffect, useState } from 'react';
import { products } from '../../data';
import './Gallery.css';

function getAllImages() {
  return products.flatMap(product => product.images);
}

function getRandomImages(count) {
  const all = getAllImages();
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Gallery = () => {
  const getImageCount = () => (window.innerWidth <= 600 ? 1 : 3);
  const [images, setImages] = useState(() => getRandomImages(getImageCount()));

  useEffect(() => {
    const updateImages = () => setImages(getRandomImages(getImageCount()));
    const interval = setInterval(updateImages, 3000);
    window.addEventListener('resize', updateImages);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateImages);
    };
  }, []);

  return (
    <div className="gallery">
      {images.map((img, idx) => (
        <img key={idx} src={img} alt="عرض باب" className="gallery-image" />
      ))}
    </div>
  );
};

export default Gallery; 