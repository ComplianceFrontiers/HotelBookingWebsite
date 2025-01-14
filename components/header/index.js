import React, { useState, useEffect } from 'react';
import Logo from '/public/images/logo-2.png';
import Link from 'next/link';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import { totalPrice } from "../../utils";
import MobileMenu from '../../components/MobileMenu';
import Image from 'next/image';

const Header = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if 'user-details' exists in localStorage and has an email
        const userDetails = JSON.parse(localStorage.getItem('user_details'));
        if (userDetails && userDetails.email) {
            setIsLoggedIn(true);
        }
    }, []);

    const SubmitHandler = (e) => {
        e.preventDefault();
    };

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    const handleLogout = () => {
        localStorage.clear();
        localStorage.removeItem('user-details');
        setIsLoggedIn(false);
    };

    const { carts } = props;

    return (
        <div className="middle-header">
            <div className={`header-style-3 ${props.hClass}`}>
                <div className="container-fluid">
                    <div className="header-content">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-4">
                                <div className="logo"> 
                                    <Link onClick={ClickHandler} href="/home" title=""><Image src={Logo} alt="" /></Link>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-8 d-lg-block d-none">
                                <nav>
                                    <ul>
                                        <li><Link onClick={ClickHandler}  href="/home" title="">Home </Link>
                                          
                                        </li>
                                        <li><Link onClick={ClickHandler} href="/room" title="">Rentals </Link>
                                            <ul>
                                                
                                                <li><Link onClick={ClickHandler} href="/destination-single/gymnasium" title="">Gym</Link></li>
                                                <li><Link  onClick={ClickHandler} href="/destination-single/mpr" title="">Multi-Purpose Room</Link></li>
                                                <li><Link   onClick={ClickHandler} href="/destination-single/conferenceCenter" title="">Conference Center</Link></li>
                                                <li><Link   onClick={ClickHandler} href="/destination-single/gymnasium" title="">Auditorium</Link></li>
                                                <li><Link  onClick={ClickHandler} href="/destination-single/pavillion" title="">Pavilion</Link></li>
                                                <li><Link   onClick={ClickHandler} href="/destination-single/firepit" title="">Firepit</Link></li>
                                            </ul>
                                        </li>
                                                                              
                                        <li><Link onClick={ClickHandler} href="/service" title="">Services </Link>
                                           
                                        </li>
                                        <li><Link onClick={ClickHandler} href="/Gallery">Gallery </Link>
                                            
                                        </li>
                                        <li><Link onClick={ClickHandler} href="/scheduling" title="">Scheduling</Link></li>

                                        <li><Link onClick={ClickHandler} href="/contact" title="">Contact</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-xl-3 action-buttons">
                                <div className="login-button">
                                    {isLoggedIn ? (
                                        <button 
                                            onClick={handleLogout}
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                padding: '10px 20px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                            }}
                                            >
                                            Logout
                                            </button>
                                    ) : (
                                        <Link href="/login">Login</Link>
                                    )}
                                </div>
                                {isLoggedIn && (
                                    <div className="contactus-button">
                                        <Link href="/events1">Dashboard</Link>
                                    </div>
                                )}
                            </div>

 
                            {/* <div className="col-xl-1 col-lg-1 col-md-6 col-sm-6 col-6">
                                <div className="contact">
                                    <div className="cart-search-contact">
                                        <div className="header-search-form-wrapper">
                                             <div className="header-search-form">
                                                <form onSubmit={SubmitHandler}>
                                                    <div>
                                                        <input type="text" className="form-control" placeholder="Search here..." />
                                                        <button type="submit"><i className="ti-search"></i></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="mini-cart">
                                            <button className="cart-toggle-btn">
                                                {" "}
                                                <i className="fi flaticon-shopping-cart"></i>{" "}
                                                <span className="cart-count">{carts.length}</span>
                                            </button>
                                            <div className="mini-cart-content">
                                                <div className="mini-cart-items">
                                                    {carts &&
                                                        carts.length > 0 &&
                                                        carts.map((catItem, crt) => (
                                                            <div className="mini-cart-item clearfix" key={crt}>
                                                                <div className="mini-cart-item-image">
                                                                    <span>
                                                                        <img src={catItem.proImg} alt="icon" />
                                                                    </span>
                                                                </div>
                                                                <div className="mini-cart-item-des">
                                                                    <p>{catItem.title} </p>
                                                                    <span className="mini-cart-item-price">
                                                                        ${catItem.price} x {" "} {catItem.qty}
                                                                    </span>
                                                                    <span className="mini-cart-item-quantity">
                                                                        <button
                                                                            onClick={() =>
                                                                                props.removeFromCart(catItem.id)
                                                                            }
                                                                            className="btn btn-sm btn-danger"
                                                                        >
                                                                            <i className="ti-close"></i>
                                                                        </button>{" "}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                                <div className="mini-cart-action clearfix">
                                                    <span className="mini-checkout-price"><strong>Total:</strong> ${totalPrice(carts)}</span>
                                                    <Link onClick={ClickHandler} href="/cart" className="view-cart-btn theme-btn">View Cart</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-md-2 col-sm-2 col-2">
                                <MobileMenu />
                            </div>
                        </div>

                        <div className="clearfix"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};

export default connect(mapStateToProps, { removeFromCart })(Header);
