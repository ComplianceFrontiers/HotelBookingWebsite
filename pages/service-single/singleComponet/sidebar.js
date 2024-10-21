import React from 'react'
import Link from 'next/link'


const Sidebar = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <div className="col col-lg-4 col-12 order-lg-1">
            <div className="service-sidebar">
                <div className="widget service-list-widget">
                    <h3>All Services</h3>
                    <ul>
                        <li><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>All Service</Link></li>
                        <li className="current"><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>Hotel Management</Link></li>
                        <li><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>Vacational Plan</Link></li>
                        <li><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>World Tour</Link></li>
                        <li><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>Guide Information</Link></li>
                        <li><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>Travelling</Link></li>
                        <li><Link onClick={ClickHandler} href='/service-single/Delicious-Food'>Hotel Room</Link></li>
                    </ul>
                </div>
                <div className="widget contact-widget">
                    <div>
                        <h4>Request a Call Back</h4>
                        <h2>(523) 456-789</h2>
                    </div>
                </div>
            </div>                    
        </div>
    )
}

export default Sidebar;