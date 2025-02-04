import React from 'react'
import Link from 'next/link'
import ab1 from '/public/images/about/2.jpg'
import Image from 'next/image'

const About2 = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <div className="wpo-about-area-2 section-padding">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="wpo-about-img">
                            <Image src={ab1} alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 colsm-12">
                        <div className="wpo-about-text">
                            <div className="wpo-section-title">
                                <span>Welcome to Bellevue Community Center Rentals</span>
                                <h2>Discover Versatile Spaces for Every Event<br/> Your Holidays </h2>
                            </div>
                            <p>Whether you&#39;re planning a corporate meeting, a sports activity, a community gathering, or a
special celebration, Bellevue Community Center (BCC) offers a range of beautifully designed,
eco-friendly facilities tailored to meet your needs. Located in the heart of Wilmington, Delaware,
our center is a hub for community activities, events, and experiences that bring people together.</p>
                            <div className="btns">
                                <Link onClick={ClickHandler} href="/scheduling" className="theme-btn-s2">Schedule Your Event</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About2;