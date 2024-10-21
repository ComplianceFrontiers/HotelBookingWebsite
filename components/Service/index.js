import React from 'react'
import Link from 'next/link'
import Services from '../../api/service'

const Service = (props) => {

    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

    return(
        <div className={`service-area section-padding ${props.sClass}`}>
            <div className="container">
                <div className="col-12">
                    <div className="wpo-section-title">
                        <span>Our Services</span>
                        <h2>What We Offer For You</h2>
                    </div>
                </div>
                <div className="row">
                    {Services.map((service, sev) => (
                        <div className="col col-lg-4 col-md-6 custom-grid col-12" key={sev}>
                            <div className="service-item">
                                <div className="service-icon">
                                    <i className={`fi ${service.fIcon}`}></i>
                                </div>
                                <div className="service-text">
                                    <h2><Link onClick={ClickHandler} href="/service-single/[slug]" as={`/service-single/${service.slug}`}>{service.title}</Link></h2>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Service;