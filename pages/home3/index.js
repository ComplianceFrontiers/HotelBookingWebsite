import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import Hero3 from '../../components/hero3'
import SearchSection from '../../components/SearchSection'
import About from '../../components/about'
import Destination3 from '../../components/Destination3'
import Service from '../../components/Service'
import RoomSection from '../../components/RoomSection'
import VideoSection from '../../components/videoSection'
import Testimonial from '../../components/Testimonial'
import BlogSection from '../../components/BlogSection'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const HomePage3 =() => {
    return(
        <Fragment>
            <Navbar hClass={'transparent-style'}/>
            <Hero3/>
            <SearchSection selectClass={'wpo-select-section-2'}/>
            <About/>
            <Destination3/>
            <Service/>
            <RoomSection rClass={'Room-area-2'}/>
            <VideoSection vClass={'container-fluid'}/>
            <Testimonial/>
            <BlogSection/>
            <Footer/> 
            <Scrollbar/>
        </Fragment>
    )
};
export default HomePage3;