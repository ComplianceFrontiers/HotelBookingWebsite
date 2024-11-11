import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Link from 'next/link'
import Rooms from '../../api/room'
import Image from 'next/image';

const RoomSection = (props) => {

    const [activeTab, setActiveTab] = useState('1');
 
    return (
        <section >
            <div className="Room-section">
                <div className="container">
                    <div className="col-12">
                        <div className="wpo-section-title">
                            {/* <span></span> */}
                            <h2>Explore Our Facilities</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12 sortable-gallery">
                            <div className="gallery-filters">
                                
                            </div>
                            <div className="gallery-container">
                                <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
    {Rooms.slice(0, 5).map((room, rm) => (
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
                    <Link
                            className="theme-btn-s2"
                            href={
                                rm === 0
                                ? `/destination-single/gymnasium`
                                : rm === 1
                                ? `/destination-single/conferenceCenter`
                                : rm === 2
                                ? `/destination-single/pavillion`
                                : rm === 3
                                ? `/destination-single/mpr`
                                : rm === 4
                                ? `/destination-single/firepit`
                                : "#"
                            }
                            as={
                              rm === 0
                                ? `/destination-single/gymnasium`
                                : rm === 1
                                ? `/destination-single/conferenceCenter`
                                : rm === 2
                                ? `/destination-single/pavillion`
                                : rm === 3
                                ? `/destination-single/mpr`
                                : rm === 4
                                ? `/destination-single/firepit`
                                : "#"
                            }
                             >
                            Explore
                            </Link>

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
                                                        <Link className="theme-btn-s2" href="#" as={`/room-single/${room.slug}`}>Explore</Link>
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
                                                        <Link className="theme-btn-s2" href="/events" as={`/room-single/${room.slug}`}>Explore</Link>
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
                                                        <Link className="theme-btn-s2" href="/events" as={`/${room.slug}`}>Explore</Link>
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
                                                        <Link className="theme-btn-s2" href="/events" as={`/room-single/${room.slug}`}>Explore</Link>
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