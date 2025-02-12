/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';

const TermsAndConditions = () => {
  // Handler function for the Go Back button
  const handleGoBack = () => {
    window.location.href = '/checkout';
  };

 return (
  <div className="terms-and-conditions">
    <img src='/images/logo.png' alt="Bellevue Community Center Logo" className="logo" />
    
    <h1>Facility Usage Policies for Bellevue Community Center</h1>
    <p>The BELLEVUE COMMUNITY CENTER (BCC) serves as a resource providing services to a broad community. One component of our service delivery is to offer meeting and activity space to groups or individuals. Nonprofit organizations, other groups, and individuals may request the use of the facility during or outside regular operating hours. Approval is contingent upon availability of space and a BCC employee to supervise during the requested time period. Groups or individuals using the facility will abide by the following policies:</p>
    
    <h2>Facility Usage Agreement</h2>
    <p>1. A Facility Usage Application/Agreement form must be completed in full and submitted with two checks (a $200.00 Security Deposit and down payment) 30 days prior to your event.</p>
    
    <h2>Security Deposit</h2>
    <p>2. The $200.00 Security Deposit is held by BCC to pay for any repairs should there be any damages. The Security Deposit will be returned to the renter within ten business days of the event.</p>
    
    <h2>Down Payment and Cancellation Policy</h2>
    <p>3. The down payment, equal to 50% of your total bill, secures the venue and is only refundable if you cancel seven or more days prior to the event.</p>
    
    <p>4. Applicants are responsible for full payment for all reserved time periods on the signed contract regardless of whether the group utilized the facility, unless BCC received seven days written notice of cancellation. Only half of the deposit will be refunded due to lost clientele.</p>
    
    <h2>Facility Rules</h2>
    <p>5. The Bellevue Community Center is a smoke-free facility, including bathrooms, hallways, and the parking lot. Attendees must be 500ft or more from BCC property to smoke.</p>
    
    <p>6. No illegal substances are permitted in the building or on the premises.</p>
    
    <p>7. Decorations or other materials may not be hung on walls. All other forms and types of decorations must be approved by the management. Decorations may be placed on tables and/or chairs.</p>
    
    <p>8. Outside food is allowed during events; however, the BCC kitchen is not available for usage during events.</p>
    
    <h2>Behavioral Expectations</h2>
    <p>9. The BCC reserves the right to ask anyone to leave the premises at any time due to inappropriate behavior. Each group is responsible for the behavior of its members while using BCC facilities. Fighting will not be tolerated at BCC. Violators will be escorted off the premises and will not be allowed back into the event.</p>
    
    <p>10. The BCC representative on duty reserves the right to terminate the event if deemed necessary. The renter will forfeit all fees and deposits in such cases.</p>
    
    <p>11. All renters must agree to abide by the "Noise and Disorderly Conduct" ordinances provided by the New Castle County Police Department (see attached).</p>
    
    {/* <button className="accept-button" onClick={handleAccept}>I Accept and Continue</button> */}
  </div>
);

};

export default TermsAndConditions;
