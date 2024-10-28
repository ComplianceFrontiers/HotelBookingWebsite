
import React from "react";
import Link from 'next/link'
import rm1 from '../../../../images/room/img-1.jpg'
import rm2 from '../../../../images/room/img-2.jpg'
import rm3 from '../../../../images/room/img-3.jpg'
import rm4 from '../../../../images/room/img-4.jpg'
import rm5 from '../../../../images/room/img-5.jpg'

const OtherRoom = (props) => {

    const Room = [

        {
            RoomImg:rm1,
            RoomHeading:"Gymnasium",
            RoomCount:'Twin Room',
            Des:"Our newly renovated gym is equipped with air conditioning, eco-friendly features, and a convenient half-court divider. It’s perfect for sports events, fitness classes, or recreational activities for all ages.",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm2,
            RoomHeading:"Dr. Lindsey Slater Conference Center",
            RoomCount:'Twin Room',
            Des:"This modern conference space features a 4K smart TV, adaptive video, and surround sound, creating a high-tech environment ideal for meetings, presentations, and professional gatherings.",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm3,
            RoomHeading:"Dr. Lindsey Slater Pavilliont",
            RoomCount:'Twin Room',
            Des:"Enjoy an open-air experience with the Dr. Lindsey Slater Pavilion. Located next to Bellevue Farms, it’s equipped with electricity outlets and Wi-Fi, making it the ideal spot for outdoor events and celebrations.",
            Price:"$142",
            Link:"/room-single",
        },{
            RoomImg:rm4,
            RoomHeading:"Multi-Purpose Room (MPR)",
            RoomCount:'Twin Room',
            Des:"Spacious and flexible, the MPR offers a stage, configurable seating, and dividers. This versatile room is perfect for workshops, family gatherings, and community events.",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm5,
            RoomHeading:"Philip B. Lynch Sr. Firepit",
            RoomCount:'Twin Room',
            Des:"Nestled within Bellevue Farms, our firepit is a unique venue for cozy gatherings, fireside storytelling, or small community events. It’s a rustic setting perfect for memorable moments under the open sky.",
            Price:"$142",
            Link:"/room-single",
        }
        

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