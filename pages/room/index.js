import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import RoomSection from '../../components/RoomSection';

const RoomPage =() => {
    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'}/>
            <PageTitle pageTitle={'Room'} pagesub={'Room'}/> 
            <RoomSection/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

export default RoomPage;
