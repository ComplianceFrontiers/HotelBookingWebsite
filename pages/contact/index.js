import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Contactpage from '../../components/Contactpage';


const ContactPage =() => {
    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} />
            <PageTitle pageTitle={'Contact Us'} pagesub={'Contact'}/> 
            <Contactpage/> 
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

export default ContactPage;

