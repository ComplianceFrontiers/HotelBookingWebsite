import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link'
import Destinations from '../../api/destination'
import Image from "next/image";


const Destination2 = () => {

    var settings = {
        dots: false,
        arrows: false,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
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


    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }


    return (
        <div className="destination-service section-padding">
            <div className="container">
                <div className="col-12">
                    <div className="wpo-section-title text-center">
                        <span>Populer Destination</span>
                        <h2>Choose Your Country</h2>
                    </div>
                </div>
                <div className="destination-carousel">
                    <Slider {...settings}>
                        {Destinations.slice(0, 4).map((destination, ditem) => (
                            <div className="item" key={ditem}>
                                <div className="destination-item">
                                    <div className="destination-img">
                                        <Image src={destination.dimg1} alt="" />
                                    </div>
                                    <div className="destination-content">
                                        <div className="content-left">
                                            <h5><Link onClick={ClickHandler} href="/destination-single/[slug]" as={`/destination-single/${destination.slug}`}>{destination.title}</Link></h5>
                                            <small>{destination.date}</small>
                                        </div>
                                        <div className="content-right">
                                            <h5>${destination.price}</h5>
                                            <span>Per Day</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>
            </div>
        </div>

    );
}

export default Destination2;