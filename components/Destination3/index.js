import React, { Component } from "react";
import Slider from "react-slick";
import Link from 'next/link'
import Destinations from '../../api/destination'
import Image from "next/image";

const Destination3 = () => {

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

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="destination-area-2 section-padding">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <div className="destination-text">
                            <div className="wpo-section-title">
                                <h2>Our Featured Destinations</h2>
                            </div>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                            <div className="btns">
                                <Link onClick={ClickHandler} href="/destination" className="theme-btn-s2">All Destination</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="country-r">
                            <div className="country-carousel">
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
                </div>
            </div>
        </div>

    );
}
export default Destination3;