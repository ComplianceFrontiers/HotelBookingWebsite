import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import api from "../../../../api";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const RoomsSec = () => {

    const productsArray = api();

    const products = productsArray

    var settings = {
        dots: false,
        arrows: true,
        speed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="room-slide-area section-padding">
            <div className="Room-carousel">
                <Slider {...settings}>
                    {products.length > 0 &&
                        products.slice(0, 6).map((product, pitem) => (
                            <div className="item" key={pitem}>
                                <div className="destination-item">
                                    <div className="destination-img">
                                        <Zoom>
                                            <img src={product.proImg} alt="products" />
                                        </Zoom>
                                    </div>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
        </div>

    );
}

export default connect(null)(RoomsSec);