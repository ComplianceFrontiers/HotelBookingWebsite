import React from "react";

const EventSummary = ({
  formData,
  dateOption,
  repeatFrequency,
  weeklyRepeatDays,
  monthlyRepeatBy,
  monthlyRepeatFrequency,
  dateRows,
  firstDate,
  endByDate,
  startTime,
  endTime
}) => {
  // Function to render selected weekly repeat days
  const renderWeeklyRepeatDays = () => {
    return Object.keys(weeklyRepeatDays)
      .filter((day) => weeklyRepeatDays[day]) // Filter selected days
      .join(", ");
  };

  // Function to render monthly repeat details
  const renderMonthlyRepeatDetails = () => {
    if (monthlyRepeatBy === "Day of Week") {
      return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy} (e.g., First Sunday)`;
    } else if (monthlyRepeatBy === "Day of Month") {
      return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy}`;
    }
    return "";
  };

  // Function to generate the recurring dates based on repeat frequency
  const generateRecurringDates = (firstDate, endByDate, repeatFrequency, startTime, endTime) => {
    const dates = [];
    let currentDate = new Date(firstDate);
    const endDate = new Date(endByDate);
  
    // Generate dates based on the frequency
    while (currentDate <= endDate) {
      dates.push({
        date: currentDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
        startTime: startTime, // Use user-inputted start time
        endTime: endTime, // Use user-inputted end time
      });
  
      // Increment date based on frequency
      if (repeatFrequency === "daily") {
        currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day for daily
      } else if (repeatFrequency === "weekly") {
        currentDate.setDate(currentDate.getDate() + 7); // Increment by 7 days for weekly
      } else {
        break;
      }
    }
  
    return dates;
  };
  

  // Generate recurring dates based on the input frequency
  const recurringDates = generateRecurringDates(firstDate, endByDate, repeatFrequency, startTime, endTime);


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

            {/* Show booked recurring dates */}
            <div>
              <h4>Recurring Dates:</h4>
              <p>These are the dates and times your event will occur:</p>
              {recurringDates.map((row, index) => (
                <div key={index}>
                  <p>{row.date} from {row.startTime} to {row.endTime}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {dateOption === "One-Time" && (
          <div>
            <h4>One-Time Event Dates:</h4>
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
