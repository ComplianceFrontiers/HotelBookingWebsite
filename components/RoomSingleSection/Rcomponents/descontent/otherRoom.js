
import React from "react";
import Link from 'next/link'
import rm1 from '../../../../images/room/img-1.jpg'
import rm2 from '../../../../images/room/img-2.jpg'
import rm3 from '../../../../images/room/img-3.jpg'

const OtherRoom = (props) => {

    const Room = [

        {
            RoomImg:rm1,
            RoomHeading:"Lake view Room",
            RoomCount:'Twin Room',
            Des:"If you are going to use a passage Lorem Ipsum, you need",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm2,
            RoomHeading:"Queen Room Balcony",
            RoomCount:'Twin Room',
            Des:"If you are going to use a passage Lorem Ipsum, you need.",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm3,
            RoomHeading:"Apartment",
            RoomCount:'Twin Room',
            Des:"If you are going to use a passage Lorem Ipsum, you need.",
            Price:"$142",
            Link:"/room-single",
        },

    ]

    return(
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
                                    {Room.map((room, rm) => (
                                        <div className="grid" key={rm}> 
                                            <div className="room-item">
                                                <img src={room.RoomImg} alt="" className="img img-responsive"/>
                                                <div className="room-text-show">
                                                    <h2>{room.RoomHeading}</h2>
                                                </div>
                                                <div className="room-text-hide">
                                                    <h2>{room.RoomHeading}</h2>
                                                    <span>{room.RoomCount}</span>
                                                    <p>{room.Des}</p>
                                                    <small>From: <span>{room.Price}</span> / Night</small>
                                                    <Link className="theme-btn-s2" to={room.Link}>Check Availability</Link>
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