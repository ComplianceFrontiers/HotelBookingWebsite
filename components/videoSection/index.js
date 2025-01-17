import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import vdimg from '/public/images/banner.png';

const VideoSection = (props) => {
    const [showVideo, setShowVideo] = useState(false);

    const handleImageClick = () => {
        setShowVideo(true);
    };

    const closeVideo = () => {
        setShowVideo(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeVideo();
            }
        };

        if (showVideo) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showVideo]);

    return (
        <div className="video-banner-area">
            <div className={`container ${props.vClass}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="banner-img" style={{ cursor: 'pointer' }} onClick={handleImageClick}>
                            <Image src={vdimg} alt="Click to play video" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for displaying video */}
            {showVideo && (
                <div className="video-modal" onClick={closeVideo}>
                    <div className="video-content" onClick={(e) => e.stopPropagation()}>
                        <video width="100%" controls autoPlay>
                            <source src="/vedios/Bccved1.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            <style jsx>{`
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .video-content {
                    position: relative;
                    width: 80%;
                    max-width: 800px;
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                }
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: #333;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    font-size: 13px;
                    padding: 5px 10px;
                    border-radius: 50%;
                }
            `}</style>
        </div>
    );
};

export default VideoSection;
