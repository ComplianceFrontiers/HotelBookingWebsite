import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import BlogList from '../../components/BlogList'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const BlogPageFullwidth =() => {
    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} />
            <PageTitle pageTitle={'Latest News'} pagesub={'Blog'}/> 
            <BlogList blLeft={'d-none'} blRight={'col-lg-10 offset-lg-1'}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default BlogPageFullwidth;

