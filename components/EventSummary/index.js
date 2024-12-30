import React from "react";

const EventSummary = ({
    formData,
    dateOption,
    repeatFrequency,
    weeklyRepeatDays,
    monthlyRepeatBy,
    monthlyRepeatFrequency,
    dateRows,firstDate, endByDate 
  }) => {
    const renderWeeklyRepeatDays = () => {
      return Object.keys(weeklyRepeatDays)
        .filter((day) => weeklyRepeatDays[day])
        .join(", ");
    };
  
    const renderMonthlyRepeatDetails = () => {
      if (monthlyRepeatBy === "Day of Week") {
        return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy} (e.g., First Sunday)`;
      } else if (monthlyRepeatBy === "Day of Month") {
        return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy}`;
      }
      return "";
    };
  
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
  
          {repeatFrequency === "weekly" && (
            <p><strong>Weekly Repeat Days:</strong> {renderWeeklyRepeatDays()}</p>
          )}
  
          {repeatFrequency === "monthly" && (
            <p><strong>Monthly Repeat:</strong> {renderMonthlyRepeatDetails()}</p>
          )}
          {dateOption === "Recurring" && (
        <>
          <p><strong>First Date:</strong> {firstDate}</p>
          <p><strong>End By:</strong> {endByDate}</p>
        </>
      )}
  
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
