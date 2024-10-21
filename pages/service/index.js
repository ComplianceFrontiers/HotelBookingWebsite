import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Service from '../../components/Service';


const ServicePage =() => {
    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} />
            <PageTitle pageTitle={'Service'} pagesub={'Service'}/> 
            <Service sClass={'s2'}/> 
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

export default ServicePage;
