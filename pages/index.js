import React, { Fragment } from 'react';
import Navbar from '../components/Navbar'
import Hero from '../components/hero'
import SearchSection from '../components/SearchSection'
import About from '../components/about'
import Destination from '../components/Destination'
import RoomSection from '../components/RoomSection'
import VideoSection from '../components/videoSection'
import Testimonial from '../components/Testimonial'
import BlogSection from '../components/BlogSection'
import Footer from '../components/footer'
import Scrollbar from '../components/scrollbar'

const HomePage = () => {
    return (
        <Fragment>
            <Navbar />
            <Hero heroClass={'hero-style-1'} />
            <SearchSection />
            <About />
            <Destination />
            <RoomSection />
            <VideoSection />
            <Testimonial />
            <BlogSection/>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage;