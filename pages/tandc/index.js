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
      
      <h1>Disclaimer and Liability Waiver for Bellevue Community Center</h1>
      <p>By participating in the Bellevue Community Center activities at the Bellevue Community Center, you acknowledge and agree to the following terms:</p>
      
      <h2>Acknowledgment of Risk</h2>
      <p>I understand that participation in Bellevue Community Center activities, including chess games and physical activities, involves inherent risks, including the risk of injury. These risks cannot be entirely eliminated regardless of the care taken to avoid injuries.</p>
      
      <h2>Assumption of Risk</h2>
      <p>I voluntarily assume all risks associated with participation in Bellevue Community Center activities. I accept full responsibility for any injury or damage that may result from my or my child's participation, whether caused by the negligence of Bellevue Community Center, the Bellevue Community Center, or otherwise.</p>
      
      <h2>Release of Liability</h2>
      <p>In consideration of being allowed to participate in Bellevue Community Center activities, I hereby release, waive, discharge, and covenant not to sue Bellevue Community Center, its directors, officers, employees, volunteers, and agents, as well as the Bellevue Community Center, its directors, officers, employees, volunteers, and agents, from any and all claims, demands, actions, or causes of action for any injury or damage that I or my child may suffer as a result of participation in Bellevue Community Center activities.</p>
      
      <h2>Indemnification</h2>
      <p>I agree to indemnify and hold harmless Bellevue Community Center and the Bellevue Community Center from any and all claims, demands, actions, or causes of action, including attorneys' fees, that may be brought against them as a result of my or my child's participation in Bellevue Community Center activities.</p>
      
      <h2>Medical Consent</h2>
      <p>I give consent for emergency medical treatment to be administered to my child in the event of an injury or illness while participating in Bellevue Community Center activities. I understand that I will be responsible for any medical expenses incurred as a result of my child's participation.</p>
      
      <h2>Understanding of Waiver</h2>
      <p>I have read and fully understand the terms of this Disclaimer and Liability Waiver. By participating in Bellevue Community Center activities, I am giving up substantial rights, including the right to sue Bellevue Community Center and the Bellevue Community Center for any injury or damage my child or I may suffer.</p>
      
      <h1>Publicity Disclaimer for Bellevue Community Center</h1>
      
      <h2>Communication Consent</h2>
      <p>You consent to receive communication from Bellevue Community Center and Chess Champs LLC regarding updates, announcements, and other relevant information related to chess activities and events.</p>
      
      <h2>Use of Contact Information</h2>
      <p>Your email address and phone number may be used by Bellevue Community Center and Chess Champs LLC to send promotional materials, newsletters, and event invitations.</p>
      
      <h2>Opt-out Option</h2>
      <p>You have the option to unsubscribe or opt-out from receiving communications at any time by following the instructions provided in the emails or by contacting Bellevue Community Center directly.</p>
      
      <h2>Privacy Policy</h2>
      <p>Your contact information will be handled in accordance with the privacy policy of Bellevue Community Center and Chess Champs LLC, ensuring confidentiality and security.</p>
      
      <p>By submitting this form, I agree to the terms and conditions outlined in the Disclaimer and Liability Waiver. By providing your email address and phone number, you acknowledge that you have read and understood the terms of this publicity disclaimer and consent to receive communications from Bellevue Community Center and Chess Champs LLC.</p>
      <button className="go-back-button" onClick={handleGoBack}>I Accept and continue</button>
    </div>
  );
};

export default TermsAndConditions;
