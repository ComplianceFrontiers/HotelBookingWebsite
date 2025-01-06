import React, { useState, useEffect } from 'react';

const StepM5 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');

  useEffect(() => {
    // Show the popup when the page loads
    setShowPopup(true);

    // Automatically hide the popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
      setShowPaymentForm(true); // Show payment options after popup
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleContinuePayment = () => {
    // Redirect to the Stripe payment link
    window.location.href = "https://buy.stripe.com/5kA03g15wazq0rS8wE";
  };

  return (
    <div className="step-m5-container">
      {showPopup && (
        <div className={`step-m5-popup-container ${showPopup ? 'show' : ''}`}>
          <p className="step-m5-popup-message">Thank you for your response!</p>
        </div>
      )}

      {showPaymentForm && (
        <div className="step-m5-select-container">
          <h4>Select your payment option:</h4>
          <select
            className="step-m5-select"
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Full Payment">Full Payment</option>
            <option value="Half Payment">Half Payment</option>
            <option value="Advance Booking Payment">Advance Booking Payment</option>
            <option value="Pay at Hotel">Pay at Hotel</option>
          </select>
          <button
            className="step-m5-continue-btn"
            onClick={handleContinuePayment}
            disabled={!paymentOption}
          >
            Continue Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default StepM5;
