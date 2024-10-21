import React from 'react'
import SearchSection from './Rcomponents/select'
import Rooms from './Rcomponents/room'
import Description from './Rcomponents/description'
import './style.css'



const RoomSingleSection = (props) => {

    return(
       <div className="room-single-page">
          <SearchSection/>
          <Rooms/>
          <Description/>
       </div>
    )
}

export default RoomSingleSection;