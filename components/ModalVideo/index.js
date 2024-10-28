import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
import '../../node_modules/react-modal-video/scss/modal-video.scss';

const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Video Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <button className="close-btn" onClick={() => setIsOpen(false)}>Close</button>
        <video width="100%" controls>
          <source src="/vedios/bccved1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>

      <div className="video-btn">
        <ul>
          <li>
            <button className="wrap" onClick={() => setIsOpen(true)}></button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VideoModal;
