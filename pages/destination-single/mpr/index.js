import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import PageTitle from '../../../components/pagetitle';
import Scrollbar from '../../../components/scrollbar';
import Destinations from '../../../api/destination';
import Benefits from '.././benefits';
import DestinationSidebar from '.././sidebar';
import Footer from '../../../components/footer';
import dimg1 from '/public/images/destination-single/21.jpg';
import dimg2 from '/public/images/destination-single/31.jpg';
import Image from 'next/image';

const DestinationSinglePage = (props) => {
    const router = useRouter();
    const destinationDetails = Destinations.find(item => item.slug === router.query.slug);

    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} />
            <PageTitle pageTitle={destinationDetails?.title} pagesub={'destination'} />
            <section className="wpo-destination-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="wpo-destination-single-wrap">
                                <div className="wpo-destination-single-content">
                                    <Image src={destinationDetails?.dSimg} alt="MPR Image" />
                                    <div className="wpo-destination-single-content-des">
                                        <h2>Versatile Space Tailored to Your Event Needs</h2>
                                        <p>
                                            Our Multi-Purpose Room (MPR) is the ultimate venue for events requiring adaptability and functionality. With ample space, a built-in stage, and flexible seating options, the MPR is designed to host a variety of gatherings, from community meetings and workshops to celebrations and performances.
                                        </p>

                                        <h2>Key Features of the MPR</h2>
                                        <ul>
                                            <li><strong>Spacious and Flexible Layout:</strong> The MPR offers a generous area that can be tailored to your specific needs, whether it’s arranging rows of chairs for a seminar or round tables for a reception.</li>
                                            <li><strong>Stage and Performance Space:</strong> Ideal for presentations, performances, and ceremonies, the room’s stage enhances visibility and creates a focal point for your event.</li>
                                            <li><strong>Room Dividers for Customization:</strong> Adjustable room dividers allow you to create separate areas for breakout sessions or smaller activities within the larger space.</li>
                                            <li><strong>Modern Equipment:</strong> The room comes equipped with tables, chairs, and access to audio-visual equipment to support presentations and events seamlessly.</li>
                                        </ul>

                                        <h2>Why Choose the MPR?</h2>
                                        <ul>
                                            <li><strong>Adaptable for All Occasions:</strong> The MPR is perfect for various events, including birthday parties, business meetings, training sessions, community activities, and cultural events.</li>
                                            <li><strong>Comfortable Setting:</strong> With climate control and a welcoming atmosphere, your guests will stay comfortable and engaged throughout your event.</li>
                                            <li><strong>Convenient Setup Options:</strong> Whether you need a banquet-style arrangement, classroom seating, or open space for mingling, the MPR can be arranged to match your vision.</li>
                                        </ul>

                                        <h2>Create Your Event, Your Way</h2>
                                        <p>
                                            From social gatherings to corporate functions, our Multi-Purpose Room is a blank canvas ready to be transformed into the perfect space for your occasion. Bring your ideas, and we’ll help you bring them to life.
                                        </p>

                                        <div className="wpo-destination-single-sub-img">
                                            <ul>
                                                <li><Image src={dimg1} alt="MPR Image 1" /></li>
                                                <li><Image src={dimg2} alt="MPR Image 2" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <Benefits />
                            </div>
                        </div>
                        <DestinationSidebar />
                    </div>
                </div>
            </section>

            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default DestinationSinglePage;
