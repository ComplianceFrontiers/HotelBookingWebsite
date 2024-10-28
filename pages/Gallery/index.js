import React from 'react';
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

const Gallery = () => {
  const images = [
    g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15
  ];

  return (
    <div className="gallery-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Masonry Photo Gallery</h1>
          <p>Home {'>'} Masonry Photo Gallery</p>
        </div>
      </div>

      <div className="quote-section">
        <blockquote>
          <p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>
          <footer>William Woe - Photographer</footer>
        </blockquote>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="masonry-gallery">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src.src} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
