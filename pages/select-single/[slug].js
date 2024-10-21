
import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar'
import { addToCart } from "../../store/actions/action";
import { connect } from "react-redux";
import { useRouter } from 'next/router'
import Footer from '../../components/footer';
import RoomsSec from './RoomSingleSection//Rcomponents/room'
import Description from './RoomSingleSection//Rcomponents/description'
import api from "../../api";
import SearchSection from './RoomSingleSection/Rcomponents/select';

const SelectSinglePage = (props) => {

    const router = useRouter()

    const productsArray = api();
    const Allproduct = productsArray

    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);
    };


    const { addToCart } = props;
    const [product, setProduct] = useState({});

    useEffect(() => {
        setProduct(Allproduct.filter(Allproduct => Allproduct.slug === router.query.slug))
    }, []);

    const item = product[0];


    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} />
            <PageTitle pageTitle={item ? item.title : null} pagesub={'Room'} />
            <div className="room-single-page">
                {item ? <SearchSection
                    item={item}
                    addToCart={addToCartProduct}
                /> : null}
                <RoomsSec item={item} />
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

export default connect(mapStateToProps, { addToCart })(SelectSinglePage);
