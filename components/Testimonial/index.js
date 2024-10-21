import React from "react";
import Slider from "react-slick";
import ts1 from '/public/images/testimonial/img-1.jpg'
import ts2 from '/public/images/testimonial/img-2.jpg'
import ts3 from '/public/images/testimonial/img-3.jpg'
import Image from "next/image";


const Testimonial = () => {

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

    const testimonial = [
        {
            tsImg: ts1,
            Des: "“The trip was incredible. I got to see so many places I wouldn't have by myself, me and my husband really enjoyed a lot.”",
            Title: 'Benjir Walton',
            Sub: "Singapore",
        },
        {
            tsImg: ts2,
            Des: "“The trip was incredible. I got to see so many places I wouldn't have by myself, me and my husband really enjoyed a lot.”",
            Title: 'Jenefar Meera',
            Sub: "Canada",
        },
        {
            tsImg: ts3,
            Des: "“The trip was incredible. I got to see so many places I wouldn't have by myself, me and my husband really enjoyed a lot.”",
            Title: 'Lily monalisa',
            Sub: "Singapore",
        },
        {
            tsImg: ts1,
            Des: "“The trip was incredible. I got to see so many places I wouldn't have by myself, me and my husband really enjoyed a lot.”",
            Title: 'Benjir Walton',
            Sub: "Singapore",
        }
    ]
    return (
        <div className="testimonial-area section-padding">
            <div className="container">
                <div className="col-12">
                    <div className="wpo-section-title">
                        <span>What Say Clients</span>
                        <h2>Our Clients are <br /> Important to Us</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="testimonial-slider clearfix">
                            <Slider {...settings}>
                                {testimonial.map((tesmnl, tsm) => (
                                    <div className="grid" key={tsm}>
                                        <div className="ratting">
                                            <ul>
                                                <li><i className="fi flaticon-star"></i></li>
                                                <li><i className="fi flaticon-star"></i></li>
                                                <li><i className="fi flaticon-star"></i></li>
                                                <li><i className="fi flaticon-star"></i></li>
                                                <li><i className="fi flaticon-star"></i></li>
                                            </ul>
                                        </div>
                                        <div className="quote">
                                            <p>{tesmnl.Des}</p>
                                        </div>
                                        <div className="client-info">
                                            <div className="client-img">
                                                <Image src={tesmnl.tsImg} alt="" />
                                            </div>
                                            <div className="client-text">
                                                <h5>{tesmnl.Title}</h5>
                                                <p>{tesmnl.Sub}</p>
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
    );
}
export default Testimonial;