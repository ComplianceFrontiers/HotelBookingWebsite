import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Services from '../../api/service'


const Features = (props) => {

    const ClickHandler = () =>{
      window.scrollTo(10, 0);
   }
    return(
        <div className="featured-area featured-sub">
            <div className="container-fluid">
                <div className="row grid ">
                    {Services.map((service, sev) => (
                        <div className="col-lg-4 items col-md-6 col-sm-6 col-12" key={sev}>
                            <div className="featured-wrap">
                                <div className="featured-img">
                                    <Image src={service.simg1} alt=""/>
                                    <div className="featured-content">
                                      <Link onClick={ClickHandler} href="/service-single/[slug]" as={`/service-single/${service.slug}`}>{service.title}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features;