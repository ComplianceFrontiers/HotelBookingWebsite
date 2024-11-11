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
            <PageTitle pagesub={'Dr. Lindsey Slater Pavilion'} />
            <section className="wpo-destination-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="wpo-destination-single-wrap">
                                <div className="wpo-destination-single-content">
                                <Image 
              src="/images/destination/img-3.jpg" 
              alt="pavillion Image" 
              width={500} 
              height={300} 
            />   
                                    <div className="wpo-destination-single-content-des">
                                        <h2>Your Ideal Outdoor Venue for Unforgettable Gatherings</h2>
                                        <p>
                                            The Dr. Lindsey Slater Pavilion, generously donated by Dr. Lindsey Slater, is a testament to community spirit and a perfect venue for outdoor events and celebrations. Situated adjacent to Bellevue Farms, this pavilion offers a blend of natural beauty and modern conveniences to ensure a unique and memorable experience for every gathering.
                                        </p>

                                        <h2>Features of the Pavilion</h2>
                                        <ul>
                                            <li><strong>Scenic Outdoor Setting:</strong> Located next to Bellevue Farms, the pavilion provides a picturesque backdrop ideal for family reunions, community picnics, outdoor workshops, and seasonal celebrations.</li>
                                            <li><strong>Modern Amenities:</strong> Equipped with electrical outlets and reliable Wi-Fi, the pavilion supports everything from live entertainment and music setups to work presentations and digital needs.</li>
                                            <li><strong>Spacious Layout:</strong> Designed to accommodate small and large groups, the space offers flexibility for varied event types, from intimate gatherings to larger community functions.</li>
                                        </ul>

                                        <h2>Why Choose the Dr. Lindsey Slater Pavilion?</h2>
                                        <ul>
                                            <li><strong>Open-Air Experience:</strong> Embrace the charm of the outdoors while benefiting from a covered space that protects against the elements, ensuring that your event goes on rain or shine.</li>
                                            <li><strong>Eco-Conscious Venue:</strong> The pavilion is crafted with sustainability in mind, harmonizing with the surrounding farm landscape and promoting environmental mindfulness.</li>
                                            <li><strong>Seamless Connectivity:</strong> With built-in electricity and Wi-Fi access, hosts can easily integrate sound systems, presentations, and other digital enhancements to elevate their event.</li>
                                        </ul>

                                        <h2>Perfect for Any Event</h2>
                                        <p>
                                            Whether it’s a birthday celebration, team-building retreat, outdoor seminar, or a community fair, the Dr. Lindsey Slater Pavilion caters to your unique needs with its versatile space and inviting atmosphere.
                                        </p>

                                        <div className="wpo-destination-single-sub-img">
                                        <ul>
                                            <li>
                                                <Image
                                                src="/images/destination/img-3.jpg"
                                                width={500}
                                                height={300}
                                                alt="MPR Image 1"
                                                />
                                            </li>
                                            <li>
                                                <Image
                                                src="/images/destination/img-3.jpg"
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
