import React from 'react'
import Link from 'next/link'
import ab1 from '/public/images/about/about.png'
import Image from 'next/image'

const About = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <div className="wpo-about-area section-padding">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <div className="wpo-about-img">
                            <Image src={ab1} alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 colsm-12">
                        <div className="wpo-about-text">
                            <div className="wpo-section-title">
                            <span>Welcome to Bellevue Community Center Rentals</span>
                                <h4>Discover Versatile Spaces for Every Event  Your Holidays </h4>
                            </div>
                            <p>Whether you&#39;re planning a corporate meeting, a sports activity, a community gathering, or a
special celebration, Bellevue Community Center (BCC) offers a range of beautifully designed,
eco-friendly facilities tailored to meet your needs. Located in the heart of Wilmington, Delaware,
our center is a hub for community activities, events, and experiences that bring people together.</p>
                            <div className="btns">
                                <Link onClick={ClickHandler} href="/destination" className="theme-btn-s2">Schedule Your Event</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;