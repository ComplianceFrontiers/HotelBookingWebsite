import React, { useState } from 'react';

const StepM4 = ({ setActiveStep, formData }) => {
  const { dateRows, dateOption, recurringDates } = formData; 

  // Formatting Date Rows (for One-Time Events)
  const formattedDateRows1 = dateRows?.map((row) => {
    return { ...row, dateTimeRange: `${row.date} (${row.startTime} - ${row.endTime})` };
  }) || [];

  const formattedDateRows2 = recurringDates?.map((row) => {
    return { ...row, dateTimeRange: `${row.date} (${row.startTime} - ${row.endTime})` };
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
 
      <div className="navigation-buttons">
        <button onClick={() => setActiveStep(3)} className="btn-add">Back</button>
        <button className="btn-add">Submit Request</button>
      </div>
    </div>
  );
};

export default StepM4;
