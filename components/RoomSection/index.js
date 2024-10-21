import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Link from 'next/link'
import Rooms from '../../api/room'
import Image from 'next/image';

const RoomSection = (props) => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }




    return (
        <section className={`Room-area section-padding ${props.rClass}`}>
            <div className="Room-section">
                <div className="container">
                    <div className="col-12">
                        <div className="wpo-section-title">
                            <span>Our Rooms</span>
                            <h2>Discover Our Rooms</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12 sortable-gallery">
                            <div className="gallery-filters">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            Classic
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            Budget
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' })}
                                            onClick={() => { toggle('3'); }}
                                        >
                                            Luxury
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '4' })}
                                            onClick={() => { toggle('4'); }}
                                        >
                                            Double
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '5' })}
                                            onClick={() => { toggle('5'); }}
                                        >
                                            Single
                                        </NavLink>
                                    </NavItem>

                                </Nav>
                            </div>
                            <div className="gallery-container">
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        {Rooms.slice(0,3).map((room, rm) => (
                                            <div className="grid" key={rm}>
                                                <div className="room-item">
                                                    <Image src={room.RoomImg} alt="" className="img img-responsive" />
                                                    <div className="room-text-show">
                                                        <h2>{room.RoomHeading}</h2>
                                                    </div>
                                                    <div className="room-text-hide">
                                                        <h2>{room.RoomHeading}</h2>
                                                        <span>{room.RoomCount}</span>
                                                        <p>{room.Des}</p>
                                                        <small>From: <span>{room.Price}</span> / Night</small>
                                                        <Link className="theme-btn-s2" href="/room-single/[slug]" as={`/room-single/${room.slug}`}>Check Availability</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </TabPane>
                                    <TabPane tabId="2">
                                        {Rooms.slice(3,6).map((room, rm) => (
                                            <div className="grid" key={rm}>
                                                <div className="room-item">
                                                    <Image src={room.RoomImg} alt="" className="img img-responsive" />
                                                    <div className="room-text-show">
                                                        <h2>{room.RoomHeading}</h2>
                                                    </div>
                                                    <div className="room-text-hide">
                                                        <h2>{room.RoomHeading}</h2>
                                                        <span>{room.RoomCount}</span>
                                                        <p>{room.Des}</p>
                                                        <small>From: <span>{room.Price}</span> / Night</small>
                                                        <Link className="theme-btn-s2" href="/room-single/[slug]" as={`/room-single/${room.slug}`}>Check Availability</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </TabPane>
                                    <TabPane tabId="3">
                                        {Rooms.slice(0,3).map((room, rm) => (
                                            <div className="grid" key={rm}>
                                                <div className="room-item">
                                                    <Image src={room.RoomImg} alt="" className="img img-responsive" />
                                                    <div className="room-text-show">
                                                        <h2>{room.RoomHeading}</h2>
                                                    </div>
                                                    <div className="room-text-hide">
                                                        <h2>{room.RoomHeading}</h2>
                                                        <span>{room.RoomCount}</span>
                                                        <p>{room.Des}</p>
                                                        <small>From: <span>{room.Price}</span> / Night</small>
                                                        <Link className="theme-btn-s2" href="/room-single/[slug]" as={`/room-single/${room.slug}`}>Check Availability</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </TabPane>
                                    <TabPane tabId="4">
                                        {Rooms.slice(3,6).map((room, rm) => (
                                            <div className="grid" key={rm}>
                                                <div className="room-item">
                                                    <Image src={room.RoomImg} alt="" className="img img-responsive" />
                                                    <div className="room-text-show">
                                                        <h2>{room.RoomHeading}</h2>
                                                    </div>
                                                    <div className="room-text-hide">
                                                        <h2>{room.RoomHeading}</h2>
                                                        <span>{room.RoomCount}</span>
                                                        <p>{room.Des}</p>
                                                        <small>From: <span>{room.Price}</span> / Night</small>
                                                        <Link className="theme-btn-s2" href="/room-single/[slug]" as={`/room-single/${room.slug}`}>Check Availability</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </TabPane>
                                    <TabPane tabId="5">
                                        {Rooms.slice(0,3).map((room, rm) => (
                                            <div className="grid" key={rm}>
                                                <div className="room-item">
                                                    <Image src={room.RoomImg} alt="" className="img img-responsive" />
                                                    <div className="room-text-show">
                                                        <h2>{room.RoomHeading}</h2>
                                                    </div>
                                                    <div className="room-text-hide">
                                                        <h2>{room.RoomHeading}</h2>
                                                        <span>{room.RoomCount}</span>
                                                        <p>{room.Des}</p>
                                                        <small>From: <span>{room.Price}</span> / Night</small>
                                                        <Link className="theme-btn-s2" href="/room-single/[slug]" as={`/room-single/${room.slug}`}>Check Availability</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomSection;