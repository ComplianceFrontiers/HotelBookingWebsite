import React from "react";
import "react-datepicker/dist/react-datepicker.css";

const SearchSection = ({ item, addToCart }) => {
    const submitHandler = (e) =>{
        e.preventDefault()
       }

    return(
        <div className="wpo-select-section-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wpo-select-wrap">
                            <div className="wpo-select-area">
                                <form onSubmit={submitHandler} className="clearfix">
                                    <div className="select-sub">
                                        <span>BEDS</span>
                                        <h2>{item.bedroom ? item.bedroom : ''} Double Bed</h2>
                                    </div>
                                    <div className="select-sub">
                                        <span>ROOM SIZE</span>
                                        <h2>870 sq ft / {item.sqm ? item.sqm : ''} sq m</h2>
                                    </div>
                                    <div className="select-sub">
                                        <span>OCCUPANCY</span>
                                        <h2>2 adults (1 children)</h2>
                                    </div>
                                    <div className="select-sub">
                                        <span>Bathroom</span>
                                        <h2>{item.bathroom ? item.bathroom : ''} Shower bath</h2>
                                    </div>
                                    <div className="select-sub">
                                        <h5>Price <span>${item.price ? item.price : ''}</span> / Night</h5>
                                        <button className="theme-btn-s2" type="submit" onClick={() => addToCart(item)}>Select This Room</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSection;