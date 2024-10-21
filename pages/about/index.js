import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import About from '../../components/about'
import Features from '../../components/Features'
import RoomSection from '../../components/RoomSection'
import Counter from '../../components/Counter'
import Testimonial from '../../components/Testimonial'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'


const AboutPage =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'About Us'} pagesub={'About'}/> 
            <About/>
            <Features/>
            <RoomSection/>
            <Counter/>
            <Testimonial/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AboutPage;
