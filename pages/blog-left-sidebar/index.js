import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar'
import BlogList from '../../components/BlogList';
import Footer from '../../components/footer';

const BlogPageLeft = (props) => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'}/>
            <PageTitle pageTitle={'Latest News'} pagesub={'Blog'} />
            <BlogList blLeft={'order-lg-1'} blRight={'order-lg-2'} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogPageLeft;
