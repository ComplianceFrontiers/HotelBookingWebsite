
import Link from "next/link";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

const SearchSection = () => {
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
                                        <h2>1 Double Bed</h2>
                                    </div>
                                    <div className="select-sub">
                                        <span>ROOM SIZE</span>
                                        <h2>870 sq ft / 132 sq m</h2>
                                    </div>
                                    <div className="select-sub">
                                        <span>OCCUPANCY</span>
                                        <h2>2 adults (1 children)</h2>
                                    </div>
                                    <div className="select-sub">
                                        <span>Bathroom</span>
                                        <h2>Shower bath</h2>
                                    </div>
                                    <div className="select-sub">
                                        <h5>Price <span>$450</span> / Night</h5>
                                        <Link href="/search-result" className="theme-btn-s2" type="submit">Check Availability</Link>
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