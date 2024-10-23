
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
            RoomHeading:"GYM",
            RoomCount:'Twin Room',
            Des:"Discover our newly renovated, A/C-equipped gymnasium featuring smart, eco-friendly utilities and a half-court divider for versatile workouts and maximum comfort during your fitness journey.",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm2,
            RoomHeading:"Dr. Lindsey Slater Conference Center",
            RoomCount:'Twin Room',
            Des:"Introducing the newly renovated Dr. Lindsey Slater Conference Center, featuring a convertible space equipped with a 4K smart TV and adaptive video and surround sound for all your meeting needs.",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm3,
            RoomHeading:"Dr. Lindsey Slater Pavilliont",
            RoomCount:'Twin Room',
            Des:"The Dr. Lindsey Slater Pavilion, generously donated by Dr. Slater, is ideal for outdoor events. Located near Bellevue Farms, it features electricity outlets and complimentary Wi-Fi for all gatherings.",
            Price:"$142",
            Link:"/room-single",
        },{
            RoomImg:rm4,
            RoomHeading:"Dr. Lindsey Slater Conference Center",
            RoomCount:'Twin Room',
            Des:"Explore our spacious and versatile Multi-Purpose Room, ideal for events. Equipped with a stage, ample seating, tables, and room dividers for customized layouts and unforgettable gatherings.",
            Price:"$142",
            Link:"/room-single",
        },
        {
            RoomImg:rm5,
            RoomHeading:"Dr. Lindsey Slater Pavilliont",
            RoomCount:'Twin Room',
            Des:"Experience the Dr. Lindsey Slater Pavilion Balcony at Bellevue Farms, featuring the Philip B. Lynch Sr. firepit, beautifully crafted with generous donations to enhance your outdoor gatherings and relaxation.",
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