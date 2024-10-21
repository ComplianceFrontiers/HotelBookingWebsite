
import React from "react";

const Pricing = (props) => {

    return(
        <div className="pricing-area">
            <div className="room-title">
                <h2>Pricing Plans</h2>
            </div>
            <div className="pricing-table">
                <table className="table-responsive pricing-wrap">
                    <thead>
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>$250</td>
                            <td>$250</td>
                            <td>$250</td>
                            <td>$250</td>
                            <td>$250</td>
                            <td>$250</td>
                            <td>$250</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="map-area">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976314309273!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbd!4v1547528325671"></iframe>
            </div>
        </div>
    )
}

export default Pricing;