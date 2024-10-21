import React, {Fragment} from 'react';
import Navbar2 from '../../components/Navbar2'
import Hero2 from '../../components/hero2';
import SearchSection from '../../components/SearchSection'
import About2 from '../../components/about2'
import Destination2 from '../../components/Destination2'
import RoomSection from '../../components/RoomSection'
import Features from '../../components/Features'
import Testimonial from '../../components/Testimonial'
import BlogSection from '../../components/BlogSection'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const HomePage2 =() => {
    return(
        <Fragment>
            <Navbar2/>
            <Hero2 heroClass={'hero-style-2'}/>
            <SearchSection/>
            <About2/>
            <Destination2/>
            <RoomSection/>
            <Features/>
            <Testimonial/>
            <BlogSection/> 
            <Footer/> 
            <Scrollbar/>
        </Fragment>
    )
};
export default HomePage2;