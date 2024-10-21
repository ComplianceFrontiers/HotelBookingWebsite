import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rm1 from '../../../images/room/img-4.jpg'
import rm2 from '../../../images/room/img-5.jpg'
import rm3 from '../../../images/room/img-6.jpg'


class Rooms extends Component {
    render() {
        var settings = {
            dots: false,
            arrows: true,
            speed: 3000,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            responsive: [
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };


        return (
            <div className="room-slide-area section-padding">
                <div className="Room-carousel">
                    <Slider {...settings}>
                        <div className="item">
                            <div className="destination-item">
                                <div className="destination-img">
                                    <img src={rm1} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="destination-item">
                                <div className="destination-img">
                                    <img src={rm2} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="destination-item">
                                <div className="destination-img">
                                    <img src={rm3} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="destination-item">
                                <div className="destination-img">
                                    <img src={rm2} alt=""/>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>

        );
    }
}

export default Rooms;