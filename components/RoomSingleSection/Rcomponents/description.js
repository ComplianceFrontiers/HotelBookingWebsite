
import React from "react";
import Link from 'next/link'
import Pricing from '../Rcomponents/descontent/pricing'
import Review from '../Rcomponents/descontent/review'
import AddReview from '../Rcomponents/descontent/addReview'
import OtherRoom from '../Rcomponents/descontent/otherRoom'
import rmd1 from '../../../images/room/img-7.jpg'
import rmd2 from '../../../images/room/img-8.jpg'

const Description = (props) => {

    return(
        <div className="Room-details-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="room-description">
                            <div className="room-title">
                                <h2>Description</h2>
                            </div>
                            <p className="p-wrap">It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples.</p>
                            <p>So when is it okay to use lorem ipsum? First, lorem ipsum works well for staging. It's like the props in a furniture store—filler text makes it look like someone is home. The same Wordpress template might eventually be home to a fitness blog, a photography website, or the online journal of a cupcake fanatic. Lorem ipsum helps them imagine what the lived-in website might look like.</p>
                            <p>Second, use lorem ipsum if you think the placeholder text will be too distracting. For specific projects, collaboration between copywriters and designers may be best, however, like Karen McGrane said, draft copy has a way of turning any meeting about layout decisions into a discussion about word choice. So don't be afraid to use lorem ipsum to keep everyone focused.</p>
                        </div>
                        <div className="room-details-service">
                            <div className="row">
                                <div className="room-details-item">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-12 col-12">
                                            <div className="room-d-text">
                                                <div className="room-title">
                                                    <h2>Amenities</h2>
                                                </div>
                                                <ul>
                                                    <li><Link href="/room-single">Refrigerator and water</Link></li>
                                                    <li><Link href="/room-single">Air Conditioner Facilities</Link></li>
                                                    <li><Link href="/room-single">Fruits are always available</Link></li>
                                                    <li><Link href="/room-single">2 Sets of nightwear</Link></li>
                                                    <li><Link href="/room-single">Tables and Chairs</Link></li>
                                                    <li><Link href="/room-single">2 Elevator Available</Link></li>
                                                    <li><Link href="/room-single">Room Side Belcony</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-12 col-12">
                                            <div className="room-d-img">
                                                <img src={rmd1} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-12 col-12">
                                            <div className="room-d-img">
                                                <img src={rmd2} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 col-12">
                                            <div className="room-d-text2">
                                                <div className="room-title">
                                                    <h2>Room Services</h2>
                                                </div>
                                                <ul>
                                                    <li><Link href="/room-single">Daily Cleaning</Link></li>
                                                    <li><Link href="/room-single">Special Swimming Pool</Link></li>
                                                    <li><Link href="/room-single">Free Parking</Link></li>
                                                    <li><Link href="/room-single">Free-to-use smartphone </Link></li>
                                                    <li><Link href="/room-single">Free Wifi</Link></li>
                                                    <li><Link href="/room-single">2 Elevator Available</Link></li>
                                                    <li><Link href="/room-single">Room Side Belcony</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Pricing/>
                        <Review/>
                        <AddReview/>
                        <OtherRoom/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;