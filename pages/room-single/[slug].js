
import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar'
import { connect } from "react-redux";
import { useRouter } from 'next/router'
import Footer from '../../components/footer';
import RoomsSec from './RoomSingleSection//Rcomponents/room'
import Description from './RoomSingleSection//Rcomponents/description'
import SearchSection from './RoomSingleSection/Rcomponents/select';
import Rooms from '../../api/room'

const RoomSinglePage = (props) => {

    const router = useRouter()

    const roomDetails = Rooms.find(item => item.slug === router.query.slug)


    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'}/>
            <PageTitle pageTitle={roomDetails?.RoomHeading} pagesub={'Room'} />
            <div className="room-single-page">
                <SearchSection/>
                <RoomsSec />
                <Description />
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        products: state.data.products,
    }
};

export default connect(mapStateToProps)(RoomSinglePage);
