import React from 'react'
import Link from 'next/link'
import Logo from '/public/images/logo.png'
import ft1 from '/public/images/footer/img-1.jpg'
import ft2 from '/public/images/footer/img-2.jpg'
import Image from 'next/image'
import Destinations from '../../api/destination'


const Footer = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <footer className="wpo-site-footer">
            <div className="wpo-upper-footer">
                <div className="wpo-footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 custom-grid">
                                <div className="logo widget-title">
                                    <Image src={Logo} alt="logo" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 custom-grid">
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-facebook"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-twitter-alt"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-instagram"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-google"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="widget market-widget wpo-service-link-widget">
                                    <div className="widget-title">
                                        <h3>Contact </h3>
                                    </div>
                                    <p>online store with lots of cool and exclusive features</p>
                                    <div className="contact-ft">
                                        <ul>
                                            <li><i className="fi ti-location-pin"></i>28 Street, New York City, USA</li>
                                            <li><i className="fi ti-mobile"></i>+000123456789</li>
                                            <li><i className="fi flaticon-email"></i>varaus@gmail.com</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="widget link-widget resource-widget">
                                    <div className="widget-title">
                                        <h3>Destination</h3>
                                    </div>
                                    {Destinations.slice(0, 2).map((destination, ditem) => (
                                        <div className="news-wrap" key={ditem}>
                                            <div className="news-img">
                                                <Image src={destination.dSimg} alt="" />
                                            </div>
                                            <div className="news-text">
                                                <h3><Link onClick={ClickHandler} href="/destination-single/[slug]" as={`/destination-single/${destination.slug}`}>{destination.title}</Link></h3>
                                                <span>{destination.date}</span>
                                                <h2>${destination.price}</h2>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="widget link-widget">
                                    <div className="widget-title">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><Link onClick={ClickHandler} href="/about">About Us</Link></li>
                                        <li><Link onClick={ClickHandler} href="/room">Our Offers</Link></li>
                                        <li><Link onClick={ClickHandler} href="/service">How Spread</Link></li>
                                        <li><Link onClick={ClickHandler} href="/contact">Contact Us</Link></li>
                                        <li><Link onClick={ClickHandler} href="/service-single">Our Event</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="widget newsletter-widget">
                                    <div className="widget-title">
                                        <h3>Newsletter</h3>
                                    </div>
                                    <form onSubmit={SubmitHandler}>
                                        <div className="input-1">
                                            <input type="email" className="form-control" placeholder="Email Address *" required="" />
                                        </div>
                                        <div className="submit clearfix">
                                            <button type="submit">subscribe<i className="ti-angle-right"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-6 col-md-6 col-12">
                            <div className="term">
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/">Privecy Policy</Link></li>
                                    <li><Link onClick={ClickHandler} href="/">Terms & Condition</Link></li>
                                    <li><Link onClick={ClickHandler} href="/">Cookies</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12">
                            <p className="copyright">&copy; 2023 Varaus. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;