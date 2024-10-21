import React from 'react'
import Link from 'next/link'


const WhyChoose = (props) => {

    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
      
    const serviceWrap = [
        {
           sIcon:'fi flaticon-tray',
           title:"Delicious Food",
           des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', 
        },
        {
           sIcon:'fi flaticon-pool',
           title:"Swimming Pool",
           des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',           
        },
        {
           sIcon:'fi flaticon-bowling',
           title:"Game Room",
           des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        },

    ]

    return(
        <div className="why-choose-section">
            <h3>Why Choose This Service</h3>
            <div className="feature-grids clearfix">
                 {serviceWrap.map((service, sev) => (
                    <div className="grid" key={sev}>
                        <div className="icon">
                            <i className={service.sIcon}></i>
                        </div>
                        <div className="hover-icon">
                            <i className={service.sIcon}></i>
                        </div>
                        <h3><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>{service.title}</Link></h3>
                        <p>{service.des}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WhyChoose;