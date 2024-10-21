import React from 'react'
import VideoModal from '../ModalVideo'
import Image from 'next/image';
import vdimg from '/public/images/banner.png'

const VideoSection = (props) => {

    return(
        <div className="video-banner-area">
            <div className={`container ${props.vClass}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="banner-img">
                            <Image src={vdimg} alt=""/>
                            <ul className="banner-video">
                                <li className="video-holder">
                                   <VideoModal/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoSection;