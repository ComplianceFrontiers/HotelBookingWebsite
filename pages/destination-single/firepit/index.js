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
            <PageTitle pageTitle={destinationDetails?.title} pagesub={'Philip B. Lynch Sr. Firepit'} />
            <section className="wpo-destination-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="wpo-destination-single-wrap">
                                <div className="wpo-destination-single-content">
                                <Image 
              src="/images/destination/img-5.jpg" 
              alt="firepit Image" 
              width={500} 
              height={300} 
            />   
                                    <div className="wpo-destination-single-content-des">
                                        <h2>Philip B. Lynch Sr. Firepit: An Inviting Outdoor Space for Memorable Moments</h2>
                                        <p>
                                            Nestled within Bellevue Farms, the Philip B. Lynch Sr. Firepit offers an outdoor venue like no other. Commissioned through generous community donations, this unique space is perfect for intimate gatherings, storytelling evenings, and cozy fireside events under the stars.
                                        </p>

                                        <h2>Features of the Firepit</h2>
                                        <ul>
                                            <li><strong>Charming Outdoor Setting:</strong> Surrounded by the natural beauty of Bellevue Farms, the firepit provides a warm, inviting atmosphere ideal for bonding with family, friends, or community members.</li>
                                            <li><strong>Designed for Versatility:</strong> Whether you're planning a casual get-together, a team-building activity, or a small group celebration, the firepit offers a relaxed setting for various types of gatherings.</li>
                                            <li><strong>Accessible and Equipped:</strong> The firepit area includes seating options and is designed with guest convenience in mind. It’s easily accessible from the main parts of the Bellevue Community Center, making it a practical yet picturesque event choice.</li>
                                        </ul>

                                        <h2>Why Choose the Philip B. Lynch Sr. Firepit?</h2>
                                        <ul>
                                            <li><strong>Cozy Ambiance:</strong> Perfect for enjoying cool evenings, the firepit creates a unique and memorable experience that sets the stage for storytelling, marshmallow roasting, and heartfelt conversations.</li>
                                            <li><strong>Community Spirit:</strong> Created through the goodwill of donors and named in honor of Philip B. Lynch Sr., this space embodies the sense of togetherness and heritage that Bellevue Farms promotes.</li>
                                            <li><strong>Enhanced Outdoor Experience:</strong> With nearby access to electricity and essential amenities, the firepit combines rustic charm with modern convenience.</li>
                                        </ul>

                                        <h2>Perfect for:</h2>
                                        <ul>
                                            <li><strong>Family Gatherings:</strong> Create lasting memories with loved ones as you share stories and laughter by the fire.</li>
                                            <li><strong>Community Events:</strong> Host community or club meetings in an atmosphere that encourages camaraderie and open conversation.</li>
                                            <li><strong>Celebrations and Special Occasions:</strong> The firepit is a delightful addition to birthday parties, anniversaries, or any event that calls for a special outdoor touch.</li>
                                        </ul>

                                        <div className="wpo-destination-single-sub-img">
                                        <ul>
                                            <li>
                                                <Image
                                                src="/images/destination/img-5.jpg"
                                                width={500}
                                                height={300}
                                                alt="MPR Image 1"
                                                />
                                            </li>
                                            <li>
                                                <Image
                                                src="/images/destination/img-5.jpg"
                                                width={500}
                                                height={300}
                                                alt="MPR Image 2"
                                                />
                                            </li>
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
