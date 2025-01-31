import React, { useState, useEffect } from 'react';
import Logo from '/public/images/logo-2.png';
import Link from 'next/link';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import { totalPrice } from "../../utils";
import MobileMenu from '../../components/MobileMenu';
import Image from 'next/image';
import { useRouter } from 'next/router';
const Header = (props) => {
    const router = useRouter();
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
        router.push('/login'); 
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
                               
                                {isLoggedIn && (
                                    <div className="contactus-button">
                                        <Link href="/dashboard">My Dashboard</Link>
                                    </div>
                                )}
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
                            </div>

 
                           
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
