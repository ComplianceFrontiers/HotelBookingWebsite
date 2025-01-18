import React, { useState } from 'react';
import axios from "axios";

const StepM4 = ({ setActiveStep, formData }) => {
  const { dateRows, dateOption, recurringDates } = formData; 
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const { email } = userDetails;
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
      estimatedTotal:totalEstimation.toFixed(2),
      approved:false,
      paid:false,
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
      setActiveStep(1);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };
  
  const handleDeleteItem = (index) => {
    // Create a new array excluding the item at the given index
    const updatedItems = additionalItems.filter((_, i) => i !== index);
    
    // Update the state with the new list of items
    setAdditionalItems(updatedItems);
  };
  
  const [additionalItems, setAdditionalItems] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', quantity: '', dates: '' });

  const handleAddItem = () => {
    setAdditionalItems([...additionalItems, newItem]);
    setNewItem({ item: '', quantity: '', dates: '' });
  };

  return (
    <div className="step-m4-container">
      <div className="step2-container">
        <h3 style={{ backgroundColor: "#3498db" , fontSize: "0.8rem", padding: "10px", color: "#fff" }}>Event Summary</h3>
        <div className="event-location">
          <p><strong>Event Name:</strong> {formData.eventName}</p>
          <p><strong>Attendance:</strong> {formData.attendance}</p>
          <p><strong>Room Type:</strong> {formData.roomType}</p>
          <p><strong>Date Option:</strong> {dateOption}</p>
        </div>
      </div>

      <div className="step2-container">
        <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>Additional Items</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "300px", marginBottom: "20px" }}>
        <div className="event-location">
  <label>Item *</label>
  <select
    value={newItem.item}
    onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
    style={{
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "0.9rem",
    }}
  >
    <option value="" disabled>
      Select an item
    </option>
    <option value="Pantry and Refreshment Services">
      Pantry and Refreshment Services
    </option>
    <option value="A/V Equipment Rental">A/V Equipment Rental</option>
    <option value="Setup and Teardown Assistance">
      Setup and Teardown Assistance
    </option>
    <option value="On-Site Event Support">On-Site Event Support</option>
    <option value="Cleanup and Maintenance Services">
      Cleanup and Maintenance Services
    </option>
    <option value="Customized Event Decor">Customized Event Decor</option>
  </select>


  
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label>Date(s) *</label>
    <input
      type="date"
      value={newItem.dates}
      onChange={(e) => setNewItem({ ...newItem, dates: e.target.value })}
    />
  </div>
  <button
  onClick={handleAddItem}
  style={{
    marginTop: "22px",
    padding: "6px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
  disabled={!newItem.item || !newItem.dates} // Disable button if item or date is not selected
>
  Add
</button>

</div>


<table className="estimates-table">   <thead>
    <tr  >
      <th  >Item</th>
      <th  >Date(s)</th>
      <th  >Action</th> {/* Add a new column for the delete button */}
    </tr>
  </thead>
  <tbody>
    {additionalItems.map((item, index) => (
      <tr key={index}>
        <td style={{ padding: "5px" }}>{item.item}</td>
        <td style={{ padding: "5px" }}>{item.dates}</td>
        <td style={{ padding: "5px" }}>
          <p
            onClick={() => handleDeleteItem(index)} // Call the delete function on click
            style={{ 
              color: "#e74c3c",
              border: "none", 
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            - 
          </p>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
      </div>
 
      {hasFormattedDateRows1 && (
        <div>
                <h2 >Estimates for Request</h2>

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
          <h2  >Estimates for Request</h2>
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
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default StepM4;
