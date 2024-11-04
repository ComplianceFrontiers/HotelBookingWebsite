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
                                <div className="contact-ft">
                                <ul>
                                <li><i className="fi ti-location-pin"></i>510 Duncan Rd, Wilmington, DE, United States, Delaware</li>
                                <li><i className="fi flaticon-email"></i>info@bellevuecc.org</li>
                                <li><i className="fi flaticon-phone">📞  </i>Contact : (302) 762 - 1391</li>
                                </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 custom-grid">
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-facebook"></i></Link></li>
                                    {/* <li><Link onClick={ClickHandler} href="/"><i className="ti-twitter-alt"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-instagram"></i></Link></li> */}
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-google"></i></Link></li>
                                </ul>
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
                            <p className="copyright">&copy; 2023 Bellevue Community Center . All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;