
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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.645814744197!2d-75.495459!3d39.77006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6e31a86d581cd%3A0xb25103ed4aea7e7f!2s510%20Duncan%20Rd%2C%20Wilmington%2C%20DE%2019809%2C%20USA!5e0!3m2!1sen!2sin!4v1730101244181!5m2!1sen!2sin"></iframe>                </div>
        
        </div>
    )
}

export default Pricing;