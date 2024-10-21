import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import Scrollbar from '../../components/scrollbar'
import Destinations from '../../api/destination'
import Benefits from './benefits'
import DestinationSidebar from './sidebar'
import Footer from '../../components/footer';
import dimg1 from '/public/images/destination-single/2.jpg'
import dimg2 from '/public/images/destination-single/3.jpg'
import Image from 'next/image';


const DestinationSinglePage = (props) => {

    const router = useRouter()

    const destinationDetails = Destinations.find(item => item.slug === router.query.slug)


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
                                    <Image src={destinationDetails?.dSimg} alt="" />
                                    <div className="wpo-destination-single-content-des">
                                        <h2>{destinationDetails?.title}</h2>
                                        <p>I must explain to you how all this mistaken idea of denouncing pleasure and
                                            praising pain was born and I will give you a complete account of the system, and
                                            expound the actual teachings of the great explorer of the truth, the
                                            master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
                                            itself, because it is pleasure, but because those who do not know how to pursue
                                            pleasure rationally encounter consequences that are extremely painful. </p>
                                        <p>Nor again is there anyone who loves or pursues or desires to obtain pain of
                                            itself, because it is pain, but because occasionally circumstances occur in
                                            which toil and pain can procure him some great pleasure. To take a trivial
                                            example, which of us ever undertakes laborious physical exercise.</p>
                                        <div className="wpo-destination-single-sub-img">
                                            <ul>
                                                <li><Image src={dimg1} alt="" /></li>
                                                <li><Image src={dimg2} alt="" /></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <p>but because those who do not know how to pursue
                                    pleasure rationally encounter consequences that are extremely painful. </p>
                                <p>Nor again is there anyone who loves or pursues or desires to obtain pain of
                                    itself, because it is pain, but because occasionally circumstances occur in
                                    which toil and pain can procure him some great pleasure. To take a trivial
                                    example, which of us ever undertakes laborious physical exercise</p>

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
    )
};


export default DestinationSinglePage;
