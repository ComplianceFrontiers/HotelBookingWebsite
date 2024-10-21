
import React from "react";
import rmd1 from '/public/images/room/r1.jpg'
import rmd2 from '/public/images/room/r2.jpg'
import Image from "next/image";

const Review = (props) => {

    return(
        <div className="room-review">
            <div className="room-title">
                <h2>Room Reviews</h2>
            </div>
            <div className="review-item">
                <div className="review-img">
                    <Image src={rmd1} alt=""/>
                </div>
                <div className="review-text">
                    <div className="r-title">
                        <h2>Marry Watson</h2>
                        <ul>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                        </ul>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                </div>
            </div>
            <div className="review-item">
                <div className="review-img">
                    <Image src={rmd2} alt=""/>
                </div>
                <div className="review-text">
                    <div className="r-title">
                        <h2>Lily Havenly</h2>
                        <ul>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                            <li><i className="fi flaticon-star"></i></li>
                        </ul>
                    </div>
                    <p> Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                </div>
            </div>
     </div>
    )
}

export default Review;