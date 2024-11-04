import React from 'react';
import ContactForm from '../ContactFrom'

const Contactpage = () => {

    return(
        <div id="Contact" className="contact-area section-padding">
            <div className="container">
                <div className="wpo-contact-info">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="info-item">
                                <div className="info-wrap">
                                    <div className="info-icon">
                                        <i className="fi flaticon-internet"></i>
                                    </div>
                                    <div className="info-text">
                                        <span>Facilities Address</span>
                                    </div>
                                </div>
                                <h2>510 Duncan Rd, Wilmington, DE, United States, Delaware</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="info-item">
                                <div className="info-wrap">
                                    <div className="info-icon">
                                        <i className="fi flaticon-email"></i>
                                    </div>
                                    <div className="info-text">
                                        <span>Official Mail</span>
                                    </div>
                                </div>
                                <h2>info@bellevuecc.org</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="info-item">
                                <div className="info-wrap">
                                    <div className="info-icon">
                                        <i className="fi flaticon-null-1"></i>
                                    </div>
                                    <div className="info-text">
                                        <span>Official Phone</span>
                                    </div>
                                </div>
                                <h2>(302) 762 - 1391</h2>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="contact-content">
                    <h2>Send a Message</h2>
                    <div className="contact-form">
                        <ContactForm/>
                    </div>
                </div>
                <div className="contact-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.645814744197!2d-75.495459!3d39.77006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6e31a86d581cd%3A0xb25103ed4aea7e7f!2s510%20Duncan%20Rd%2C%20Wilmington%2C%20DE%2019809%2C%20USA!5e0!3m2!1sen!2sin!4v1730101244181!5m2!1sen!2sin"></iframe>                </div>
            </div>
        </div>
     )
        
}

export default Contactpage;
