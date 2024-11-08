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
                                    <Image src={destinationDetails?.dSimg} alt="Conference Center Image" />
                                    <div className="wpo-destination-single-content-des">
                                        <h2>Experience Professional Excellence in Our Premier Conference Venue</h2>
                                        <p>
                                            Welcome to the Dr. Lindsey Slater Conference Center, where modern design meets functionality to support events of all types. Made possible through the generous contributions of Dr. Lindsey Slater, this state-of-the-art space embodies both elegance and practicality, ensuring a seamless experience for meetings, workshops, training sessions, and special events.
                                        </p>

                                        <h2>Key Features of the Conference Center</h2>
                                        <ul>
                                            <li><strong>Adaptive Technology:</strong> Equipped with a 4K smart TV and a cutting-edge audio-visual system, our conference center enables high-definition presentations, video conferencing, and multimedia engagement.</li>
                                            <li><strong>Surround Sound:</strong> Enjoy crisp, immersive audio, perfect for speeches, presentations, or interactive workshops.</li>
                                            <li><strong>Versatile Setup:</strong> The center’s layout can be adjusted to meet the specific needs of your event, whether it's a formal boardroom meeting, seminar, or a more casual gathering.</li>
                                            <li><strong>Comfort and Modern Design:</strong> Our space is thoughtfully designed with comfortable seating, optimal lighting, and a welcoming atmosphere that fosters productivity and collaboration.</li>
                                        </ul>

                                        <h2>Why Choose the Dr. Lindsey Slater Conference Center?</h2>
                                        <ul>
                                            <li><strong>Convenient Location:</strong> Situated within the Bellevue Community Center, the conference center offers easy access and ample parking, making it ideal for local and visiting attendees.</li>
                                            <li><strong>Enhanced Connectivity:</strong> With reliable Wi-Fi and technology integrations, you can ensure seamless digital presentations and connections.</li>
                                            <li><strong>Professional Support:</strong> Our team is available to assist with setup, equipment use, and any needs that arise before or during your event.</li>
                                        </ul>

                                        <h2>Perfect for Various Occasions</h2>
                                        <p>
                                            From corporate meetings to community workshops and everything in between, the Dr. Lindsey Slater Conference Center is designed to support and elevate your event. Whether you’re organizing a professional development session or hosting a nonprofit fundraiser, this space adapts to create an engaging and memorable experience.
                                        </p>

                                        <div className="wpo-destination-single-sub-img">
                                            <ul>
                                                <li><Image src={dimg1} alt="Conference Center Image 1" /></li>
                                                <li><Image src={dimg2} alt="Conference Center Image 2" /></li>
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
