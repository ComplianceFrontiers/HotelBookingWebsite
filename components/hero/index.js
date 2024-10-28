import React from "react";
import Slider from "react-slick";
import Link from 'next/link'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = (props) => {

    var settings = {
        dots: true,
        arrows: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true
    };
    return (

        <section className={`hero ${props.heroClass}`}>
            <div className="hero-slider">
                <Slider {...settings}>
                    <div className="slide">
                        <div className="slide-inner" style={{ backgroundImage: `url(${'/images/slider/bcc.jpg'})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                                        <div className="slide-title">
                                            <h2>Spaces Designed for Moments That Matter</h2>
                                        </div>
                                        <div className="slide-subtitle">
                                            <p>At Bellevue Community Center, we provide spaces that transform gatherings into
                                            cherished memories.</p>
                                        </div>
                                        <div className="btns">
                                            <Link href="/room" className="theme-btn">Create Memories</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="slide-inner" style={{ backgroundImage: `url(${'/images/slider/slide-2.jpg'})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                                        <div className="slide-title">
                                            <h2>The Heart of Every Gathering</h2>
                                        </div>
                                        <div className="slide-subtitle">
                                            <p>At Bellevue Community Center, we’re at the heart of every gathering, fostering
                                            connections and creating unforgettable experiences.</p>
                                        </div>
                                        <div className="btns">
                                            <Link href="/room" className="theme-btn">Create Memories</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="slide-inner" style={{ backgroundImage: `url(${'/images/slider/slide-3.jpg'})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                                        <div className="slide-title">
                                            <h2>Flexible Spaces, Lasting Memories</h2>
                                        </div>
                                        <div className="slide-subtitle">
                                            <p>At Bellevue Community Center, our flexible spaces are designed to create lasting
                                            memories for every event.</p>
                                        </div>
                                        <div className="btns">
                                            <Link href="/room" className="theme-btn">Create Memories</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    );
}
export default Hero;