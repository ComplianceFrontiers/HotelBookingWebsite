
import React from "react";
import Link from 'next/link'
import Rooms from '../../../../../api/room'
import Image from "next/image";

const OtherRoom = (props) => {


    return (
        <div className="other-room">
            <div className="Room-section">
                <div className="container">
                    <div className="col-12">
                        <div className="room-title">
                            <h2>Other Rooms</h2>
                        </div>
                        <div className="row">
                            <div className="col col-xs-12 sortable-gallery">
                                <div className="gallery-container">
                                    {Rooms.slice(0, 3).map((room, rm) => (
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherRoom;