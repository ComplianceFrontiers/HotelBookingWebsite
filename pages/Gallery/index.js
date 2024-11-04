// Gallery Component

import React, { useState ,Fragment} from 'react';
import g1 from '/public/images/Gallery/1.jpg';
import g2 from '/public/images/Gallery/2.jpg';
import g3 from '/public/images/Gallery/3.jpg';
import g4 from '/public/images/Gallery/4.jpg';
import g5 from '/public/images/Gallery/5.jpg';
import g6 from '/public/images/Gallery/6.jpg';
import g7 from '/public/images/Gallery/7.jpg';
import g8 from '/public/images/Gallery/8.jpg';
import g9 from '/public/images/Gallery/9.jpg';
import g10 from '/public/images/Gallery/10.jpg';
import g11 from '/public/images/Gallery/11.jpg';
import g12 from '/public/images/Gallery/12.jpg';
import g13 from '/public/images/Gallery/13.jpg';
import g14 from '/public/images/Gallery/14.jpg';
import g15 from '/public/images/Gallery/15.jpg';
import Navbar from '../../components/Navbar';

const Gallery = () => {
  const images = [
    g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15
  ];

  const [modalActive, setModalActive] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (modalActive) {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }
  };

  return (
    <Fragment>           
         <Navbar hclass={'wpo-header-style-3'}/>
    <div className="gallery-container" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="hero-section">
        <div className="hero-content">
          <h1>BCC Photo Gallery</h1>
        </div>
      </div>
      <div className="masonry-gallery">
        {images.map((src, index) => (
          <div key={index} className="gallery-item" onClick={() => openModal(index)}>
            <img src={src.src} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>

     {/* Full-screen Modal */}
<div className={`modal ${modalActive ? 'active' : ''}`} onClick={closeModal}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <img src={images[currentImageIndex].src} alt={`Full-screen Gallery ${currentImageIndex + 1}`} />
    <div className="arrow left" onClick={prevImage} aria-label="Previous Image" role="button">&#10094;</div>
    <div className="arrow right" onClick={nextImage} aria-label="Next Image" role="button">&#10095;</div>
    <div className="close-button" onClick={closeModal} aria-label="Close" role="button">&#10006;</div>
  </div>
</div>

    </div>
    </Fragment> 
  );
};

export default Gallery;
