
import React from "react";
import Link from 'next/link'

const AddReview = (props) => {

   const submitHandler = (e) =>{
    e.preventDefault()
   }

    return(
        <div className="add-review">
        <div className="room-title">
            <h2>Add Review</h2>
        </div>
        <div className="wpo-blog-single-section">
            <div className="review-text">
                <div className="r-title">
                    <ul>
                        <li><Link href="/room-single"><i className="fi flaticon-star-1"></i></Link></li>
                        <li><Link href="/room-single"><i className="fi flaticon-star-1"></i></Link></li>
                        <li><Link href="/room-single"><i className="fi flaticon-star-1"></i></Link></li>
                        <li><Link href="/room-single"><i className="fi flaticon-star-1"></i></Link></li>
                        <li><Link href="/room-single"><i className="fi flaticon-star-1"></i></Link></li>
                    </ul>
                </div>
            </div>
            <div className="review-add">
                <div className="comment-respond">
                    <form onSubmit={submitHandler} method="post" id="commentform" className="comment-form">
                        <div className="form-inputs">
                            <input placeholder="Your Name*" type="text"/>
                            <input placeholder="Your Email*" type="email"/>
                        </div>
                        <div className="form-textarea">
                            <textarea id="comment" placeholder="Your Review"></textarea>
                        </div>
                        <div className="form-check">
                            <div className="shipp pb">
                                <input type="checkbox" id="c2" name="cc"/>
                                <label htmlFor="c2"><span></span>Save my name, email, and website in this browser for the next time I comment.</label>
                            </div>
                        </div>
                        <div className="form-submit">
                            <input id="submit" value="Submit Now" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddReview;