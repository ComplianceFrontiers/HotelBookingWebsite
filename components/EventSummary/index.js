import React from "react";

const EventSummary = ({
    formData,
    dateOption,
    repeatFrequency,
    weeklyRepeatDays,
    monthlyRepeatBy,
    monthlyRepeatFrequency,
    dateRows,
  }) => {
    return (
      <div className="event-summary">
        <h3>Event Summary</h3>
        <div>
          <h4>Event Information</h4>
          <p><strong>Event Name:</strong> {formData.eventName}</p>
          <p><strong>Attendance:</strong> {formData.attendance}</p>
          <p><strong>Room Type:</strong> {formData.roomType}</p>
  
          <h4>Date & Time</h4>
          <p><strong>Option:</strong> {dateOption}</p>
          <p><strong>Repeat Frequency:</strong> {repeatFrequency}</p>
          <p><strong>Weekly Days:</strong> {Object.keys(weeklyRepeatDays).filter(day => weeklyRepeatDays[day]).join(", ")}</p>
          <p><strong>Monthly Repeat:</strong> {monthlyRepeatBy} every {monthlyRepeatFrequency}</p>
  
          {dateOption === "One-Time" && (
            <div>
              <h4>Dates</h4>
              {dateRows.map((row, index) => (
                <div key={index}>
                  <p>{row.date} from {row.startTime} to {row.endTime}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

export default EventSummary;
