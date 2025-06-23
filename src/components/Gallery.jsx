import React, { useEffect, useState } from 'react';
import { products } from '../data';
import './Gallery.css';

function getAllImages() {
  // Flatten all images from all products
  return products.flatMap(product => product.images);
}

function getRandomImages(count) {
  const all = getAllImages();
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Gallery = () => {
  const [images, setImages] = useState(() => getRandomImages(3));

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(getRandomImages(3));
    }, 3000);
    return () => clearInterval(interval);
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