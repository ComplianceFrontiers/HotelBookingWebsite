import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Destinations from '../../api/destination'

const Destination = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <div className="destination-area section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="destination-text">
                            <div className="wpo-section-title">
                                <span>Populer Destination </span>
                                <h2>Choose Your Country </h2>
                            </div>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators.</p>
                            <div className="btns">
                                <Link onClick={ClickHandler} href="/destination" className="theme-btn-s2">Discover More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="destination-wrap">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 custom-grid">
                                    <div className="destination-left">
                                        {Destinations.slice(0, 2).map((destination, ditem) => (
                                            <div className="destination-item" key={ditem}>
                                                <div className="destination-img">
                                                    <Image src={destination.dimg1} alt="" />
                                                </div>
                                                <div className="destination-content">
                                                    <div className="content-left">
                                                        <h5><Link onClick={ClickHandler} href="/destination-single/[slug]" as={`/destination-single/${destination.slug}`}>{destination.title}</Link></h5>
                                                        <small>{destination.date}</small>
                                                    </div>
                                                    <div className="content-right">
                                                        <h5>${destination.price}</h5>
                                                        <span>Per Day</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 custom-grid">
                                    <div className="destination-right">
                                        {Destinations.slice(2, 4).map((destination, ditem) => (
                                            <div className="destination-item" key={ditem}>
                                                <div className="destination-img">
                                                    <Image src={destination.dimg1} alt="" />
                                                </div>
                                                <div className="destination-content">
                                                    <div className="content-left">
                                                        <h5><Link onClick={ClickHandler} href="/destination-single/[slug]" as={`/destination-single/${destination.slug}`}>{destination.title}</Link></h5>
                                                        <small>{destination.date}</small>
                                                    </div>
                                                    <div className="content-right">
                                                        <h5>${destination.price}</h5>
                                                        <span>Per Day</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destination;