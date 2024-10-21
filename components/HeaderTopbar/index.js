import React from 'react'
import Link from 'next/link'

const HeaderTopbar = () => {
    return(	
        <div className="topbar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-md-6 col-sm-7 col-12">
                        <div className="contact-intro">
                            <ul>
                                <li><i className="fi ti-location-pin"></i>28 Street, New York City, USA</li>
                                <li><i className="fi flaticon-email"></i> varaus@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-md-6 col-sm-5 col-12">
                        <div className="contact-info">
                            <ul>
                                <li><Link href="/"><i className="ti-facebook"></i></Link></li>
                                <li><Link href="/"><i className="ti-twitter-alt"></i></Link></li>
                                <li><Link href="/"><i className="ti-instagram"></i></Link></li>
                                <li><Link href="/"><i className="ti-google"></i></Link></li>
                                <li><Link className="theme-btn-s2" href="/room">Book A Room </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTopbar;