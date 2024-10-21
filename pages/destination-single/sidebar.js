import React from 'react'
import Destinations from '../../api/destination'
import Link from 'next/link'
import ins1 from '/public/images/instragram/1.jpg'
import ins2 from '/public/images/instragram/2.jpg'
import ins3 from '/public/images/instragram/3.jpg'
import ins4 from '/public/images/instragram/4.jpg'
import ins5 from '/public/images/instragram/5.jpg'
import ins6 from '/public/images/instragram/6.jpg'
import Image from 'next/image'

const DestinationSidebar = (props) => {

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="col-lg-4 col-md-8">
            <div className="wpo-single-sidebar">
                <div className="wpo-service-widget widget">
                    <h2>All Destination</h2>
                    <ul>
                        {Destinations.slice(0, 5).map((destination, Sitem) => (
                            <li key={Sitem}><Link onClick={ClickHandler} href="/destination-single/[slug]" as={`/destination-single/${destination.slug}`}>{destination.title}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="wpo-newsletter-widget widget">
                    <h2>Newsletter</h2>
                    <p>Join 20,000 Sabscribers!</p>
                    <form className="form" onSubmit={SubmitHandler}>
                        <input type="text" placeholder="Email Address" />
                        <button type="submit">Sign Up</button>
                    </form>
                    <span>By signing up you agree to our <Link onClick={ClickHandler} href="/destination-single/5-star-Hotel-and-Resort">Privecy Policy</Link></span>
                </div>
                <div className="wpo-instagram-widget widget">
                    <h2>Instagram Shot</h2>

                    <ul>
                        <li><Image src={ins1} alt="" /></li>
                        <li><Image src={ins2} alt="" /></li>
                        <li><Image src={ins3} alt="" /></li>
                        <li><Image src={ins4} alt="" /></li>
                        <li><Image src={ins5} alt="" /></li>
                        <li><Image src={ins6} alt="" /></li>
                    </ul>
                </div>

                <div className="wpo-contact-widget widget">
                    <h2>How We Can <br /> Help You!</h2>
                    <p>labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                        viverra maecenas accumsan lacus vel facilisis. </p>
                    <Link onClick={ClickHandler} href="/contact">Contact Us</Link>
                </div>
            </div>
        </div>

    )
}

export default DestinationSidebar;