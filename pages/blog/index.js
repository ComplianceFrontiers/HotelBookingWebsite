import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar'
import BlogList from '../../components/BlogList';
import Footer from '../../components/footer';


const BlogDetails = () => {

    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'}/>
            <PageTitle pageTitle={'Latest News'} pagesub={'Blog'} />
            <BlogList/>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;
