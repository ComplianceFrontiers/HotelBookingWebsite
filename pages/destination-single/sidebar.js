import React from 'react';
import Destinations from '../../api/destination';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import ins1 from '/public/images/instragram/1.jpg';
import ins2 from '/public/images/instragram/2.jpg';
import ins3 from '/public/images/instragram/3.jpg';
import ins4 from '/public/images/instragram/4.jpg';
import ins5 from '/public/images/instragram/5.jpg';
import ins6 from '/public/images/instragram/6.jpg';
import Image from 'next/image';

const DestinationSidebar = (props) => {
    const router = useRouter(); // Initialize useRouter

    const SubmitHandler = (e) => {
        e.preventDefault();
        // Optionally, you can add form validation or other logic here

        // Redirect to /events after form submission
        router.push('/events');
    };

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <div className="col-lg-4 col-md-8">
            <div className="wpo-single-sidebar">
                <div className="wpo-service-widget widget">
                    <h2>Our Facilities</h2>
                    <ul>
                        {Destinations.slice(0, 5).map((destination, Sitem) => (
                            <li key={Sitem}>
                                <Link onClick={ClickHandler} href="/destination-single/[slug]" as={`/destination-single/${destination.slug}`}>
                                    {destination.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="wpo-newsletter-widget widget">
                    <h2>Like Our Facility? Book Now!</h2>
                    <p>If you’re impressed with our gym and its offerings, why wait? Secure your spot today and bring your event to life at Bellevue Community Center. Click below to make your reservation and start planning your memorable gathering.</p>
                    <form className="form" onSubmit={SubmitHandler}>
                        {/* <input type="text" placeholder="Email Address" /> */}
                        <button type="submit">Book Now</button>
                    </form>
                    <span>Please review our <Link onClick={ClickHandler} href="/tandc">Terms and Conditions</Link></span>
                </div>
              
                <div className="wpo-contact-widget widget">
                    <h2>Have Questions?  <br /> We're Here to Help!!</h2>
                    <p>Need more information or assistance with booking? Don’t hesitate to reach out. Our friendly team is ready to answer any questions and guide you through the reservation process to ensure your experience is seamless and enjoyable.</p>
                    <Link onClick={ClickHandler} href="/contact">Contact Us</Link>
                </div>
            </div>
        </div>
    );
}

export default DestinationSidebar;
