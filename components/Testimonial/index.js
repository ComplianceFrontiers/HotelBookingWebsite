import React from "react";
import Slider from "react-slick";
import ts1 from '/public/images/testimonial/1.png'
import ts2 from '/public/images/testimonial/2.png'
import ts3 from '/public/images/testimonial/3.png'
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
            Des: "“The perfect venue for our community event! The facilities were spotless, and the additional services like A/V equipment made our presentation seamless. Highly recommend!”",
            Title: 'Sarah L.',
            Sub: "Newark DE",
        },
        {
            tsImg: ts2,
            Des: "“We hosted a family reunion at the pavilion, and it was a fantastic experience. The setup and cleanup services allowed us to focus on spending quality time with loved ones.”",
            Title: 'Emily K., Dover, DE',
            Sub: "Wilmington, DE",
        },
        {
            tsImg: ts3,
            Des: "“From the spacious multi-purpose room to the friendly on-site support, everything exceeded our expectations. Bellevue Community Center made our event unforgettable!”",
            Title: 'Mark R.',
            Sub: "Wilmington",
        }
        
    ]
    return (
        <div className="testimonial-area section-padding">
            <div className="container">
                <div className="col-12">
                    <div className="wpo-section-title">
                        <span>Why Choose BCC for Your Next Event?</span>
                        <p>Our commitment to sustainability, advanced amenities, and the convenience of location make
Bellevue Community Center the perfect choice for your event. Whether you&#39;re hosting a small
gathering or a large celebration, our facilities are designed to offer comfort, flexibility, and
modern convenience.</p>
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