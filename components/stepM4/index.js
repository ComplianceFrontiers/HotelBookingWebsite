import React, { useState } from 'react';
import axios from "axios";

const StepM4 = ({ setActiveStep, formData }) => {
  const { dateRows, dateOption, recurringDates } = formData; 
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const { email } = userDetails;
console.log("dateRows, dateOption, recurringDates ",dateRows, recurringDates )
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0'); // Adds leading zero if day is less than 10
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const formattedDateRows1 = dateRows?.map((row) => {
    return {
      ...row,
      date: formatDate(row.date), // Format the date
    };
  }) || [];
  const formattedDateRows2 = recurringDates?.map((row) => {
    // Split the date into day, month, year
    const [day, month, year] = row.date.split('-');
  
    // Create a valid date object (in YYYY-MM-DD format)
    const date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
  
    // Format the date to DD-MM-YYYY
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  
    return {
      ...row,
      date: formattedDate, // Set the formatted date
    };
  }) || [];
  
  console.log("formattedDateRows2, recurringDates", formattedDateRows2, recurringDates);
  
  const hasFormattedDateRows1 = dateOption === 'One-Time' && formattedDateRows1.length > 0;
  const hasRecurringDates = dateOption === 'Recurring' && formattedDateRows2.length > 0;

  // Function to calculate hours from start and end time
  const calculateHours = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const diffMinutes = endTotalMinutes - startTotalMinutes;
    return diffMinutes / 60; // Return the difference in hours
  };

  const totalEstimation = [...formattedDateRows1, ...formattedDateRows2].reduce(
    (total, row) => {
      const totalHours = calculateHours(row.startTime, row.endTime);
      return total + totalHours * 50; // Assuming $50/hour rate
    },
    0
  );

  const handleCheckout = async () => {
    const bookedDates =
      dateOption === "One-Time"
        ? formattedDateRows1 && formattedDateRows1.length > 0
          ? formattedDateRows1
          : []
        : formattedDateRows2 && formattedDateRows2.length > 0
        ? formattedDateRows2
        : [];
  
    console.log("bookedDates", bookedDates); // Log bookedDates for debugging
  
    const bookingDetails = {
      event_name: formData.eventName,
      attendance: formData.attendance,
      room_type: formData.roomType,
      date_option: formData.dateOption,
      booked_dates: bookedDates,
    };
  
    console.log("bookingDetails", bookingDetails); // Log the booking details
  
    try {
      const response = await axios.post(
        "https://hotel-website-backend-eosin.vercel.app/checkout",
        {
          email, // Add user email from local storage
          booked_details: bookingDetails,
        }
      );
      setActiveStep(5);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };
  

  const [additionalItems, setAdditionalItems] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', quantity: '', dates: '' });

  const handleAddItem = () => {
    setAdditionalItems([...additionalItems, newItem]);
    setNewItem({ item: '', quantity: '', dates: '' });
  };
console.log("frrr",formattedDateRows2)
  return (
    <div className="step-m4-container">
      <div className="step2-container">
        <h3 style={{ backgroundColor: "#0078d7", fontFamily: "Monster", fontSize: "1.2rem", padding: "10px", color: "#fff" }}>Event Summary</h3>
        <div className="event-location">
          <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Event Name:</strong> {formData.eventName}</p>
          <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Attendance:</strong> {formData.attendance}</p>
          <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Room Type:</strong> {formData.roomType}</p>
          <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Date Option:</strong> {dateOption}</p>
        </div>
      </div>

      <div style={{ border: "1px solid #0078d7", padding: "15px", borderRadius: "8px", marginTop: "20px", fontSize: "0.8rem" }}>
        <h3 style={{ fontFamily: "Monster", fontSize: "1rem", marginBottom: "10px" }}>Additional Items</h3>
        <div>
          <label>Item *</label>
          <input
            type="text"
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
            style={{ display: "block", marginBottom: "10px" }}
          />
          <label>Quantity *</label>
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            style={{ display: "block", marginBottom: "10px" }}
          />
          <label>Date(s) *</label>
          <input
            type="date"
            value={newItem.dates}
            onChange={(e) => setNewItem({ ...newItem, dates: e.target.value })}
            style={{ display: "block", marginBottom: "10px" }}
          />
          <button onClick={handleAddItem} style={{ marginTop: "10px", padding: "5px 10px" }}>Add Item</button>
        </div>

        <table style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse", fontSize: "0.8rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #0078d7" }}>
              <th style={{ textAlign: "left", padding: "5px" }}>Item</th>
              <th style={{ textAlign: "left", padding: "5px" }}>Quantity</th>
              <th style={{ textAlign: "left", padding: "5px" }}>Date(s)</th>
            </tr>
          </thead>
          <tbody>
            {additionalItems.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "5px" }}>{item.item}</td>
                <td style={{ padding: "5px" }}>{item.quantity}</td>
                <td style={{ padding: "5px" }}>{item.dates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="step-title">Event Location and Dates</h2>

      {hasFormattedDateRows1 && (
        <div>
          <h3 className="estimates-title">Estimates for Request</h3>
          <table className="estimates-table"> 
            <thead>
              <tr>
                <th>#</th>
                <th>Request Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total Hours</th>
                <th>Estimated Base</th>
                <th>Rate</th>
                <th>Estimated Total</th>
              </tr>
            </thead>
            <tbody>
              {formattedDateRows1.map((row, index) => {
                const totalHours = calculateHours(row.startTime, row.endTime);
                const estimatedTotal = totalHours * 50;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.date}</td>
                    <td>1</td>
                    <td>1</td>
                    <td>{totalHours.toFixed(2)}</td>
                    <td>50$</td>
                    <td>Per Hour</td>
                    <td>${estimatedTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {hasRecurringDates && (
        <div>
          <h3 className="estimates-title">Estimates for Request</h3>
          <table className="estimates-table"> 
            <thead>
              <tr>
                <th>#</th>
                <th>Request Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total Hours</th>
                <th>Estimated Base</th>
                <th>Rate</th>
                <th>Estimated Total</th>
              </tr>
            </thead>
            <tbody>
              {formattedDateRows2.map((row, index) => {
                const totalHours = calculateHours(row.startTime, row.endTime);
                const estimatedTotal = totalHours * 50;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.date}</td>
                    <td>1</td>
                    <td>1</td>
                    <td>{totalHours.toFixed(2)}</td>
                    <td>50$</td>
                    <td>Per Hour</td>
                    <td>${estimatedTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    
      <div className="total-estimation-container">
        <h4 className="total-estimation-text">Total Estimation: ${totalEstimation.toFixed(2)}</h4>
      </div>

      <div className="navigation-buttons">
        <button onClick={() => setActiveStep(3)} className="btn-add">Back</button>
        <button 
          onClick={handleCheckout} 
          className="btn-add"
          disabled={totalEstimation === 0} // Disable button if total estimation is 0
        >
          Proceed for Payment
        </button>
      </div>
    </div>
  );
};

export default StepM4;
