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
      return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy} `;
    } else if (monthlyRepeatBy === "Day of Month") {
      return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy}`;
    }
    return "";
  };
  const generateRecurringDates = (firstDate, endByDate, repeatFrequency, startTime, endTime, monthlyRepeatBy, monthlyRepeatFrequency) => {
    const dates = [];
    let currentDate = new Date(firstDate);
    const endDate = new Date(endByDate);
  
    const getFirstSundayAfterDate = (startDate) => {
      const date = new Date(startDate);
      // Set the date to the first day of the current month
      date.setDate(1);
      const day = date.getDay();
      // Calculate how many days to add to get the first Sunday
      const diff = (7 - day) % 7;
      date.setDate(date.getDate() + diff);
      return date;
    };
  
    // Generate recurring dates based on the input frequency
    while (currentDate <= endDate) {
      if (repeatFrequency === "monthly" && monthlyRepeatBy === "Day of Week" && monthlyRepeatFrequency === "1 month") {
        // Find the first Sunday of the current month after the `currentDate`
        const firstSunday = getFirstSundayAfterDate(currentDate);
  
        // If the first Sunday is within the end date range, add it to the list
        if (firstSunday <= endDate) {
          dates.push({
            date: firstSunday.toISOString().split('T')[0], // Format to YYYY-MM-DD
            startTime: startTime, // Use user-inputted start time
            endTime: endTime, // Use user-inputted end time
          });
        }
  
        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        break;
      }
    }
  
    return dates;
  };
  
  // Generate recurring dates based on the input frequency
  const recurringDates = generateRecurringDates(firstDate, endByDate, repeatFrequency, startTime, endTime,monthlyRepeatBy, monthlyRepeatFrequency);


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
