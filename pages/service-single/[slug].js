import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import Scrollbar from '../../components/scrollbar'
import Services from '../../api/service'
import Footer from '../../components/footer';
import Image from 'next/image';
import WhyChoose from './singleComponet/whyChose';
import Categorys from './singleComponet/categorys';
import Sidebar from './singleComponet/sidebar';


const DestinationSinglePage = (props) => {

    const router = useRouter()

    const serviceDetails = Services.find(item => item.slug === router.query.slug)


    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} />
            <PageTitle pageTitle={serviceDetails?.title} pagesub={'destination'} />
            <section className="service-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-8 col-12 order-lg-2">
                            <div className="service-single-content">
                                <div className="service-single-des">
                                    <div className="service-single-img">
                                        <Image src={serviceDetails?.ssImg} alt="" />
                                    </div>
                                    <h2>{serviceDetails?.title}</h2>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. </p>
                                    <p>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour,sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined.</p>
                                </div>
                                <WhyChoose />
                                <Categorys />
                            </div>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};


export default DestinationSinglePage;
