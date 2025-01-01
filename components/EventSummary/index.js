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
  endTime,
  repeatOn,
  repeatDay
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
    } else if (monthlyRepeatBy === "Date of Month") {
      return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy}`;
    }
    return "";
  };

  const generateRecurringDates = (
    firstDate,
    endByDate,
    repeatFrequency,
    startTime,
    endTime,
    monthlyRepeatBy,
    monthlyRepeatFrequency,
    repeatOn,
    repeatDay,
    weeklyRepeatDays
  ) => {
    console.log("firstDate:", firstDate);
    console.log("endByDate:", endByDate);
    console.log("repeatFrequency:", repeatFrequency);
    console.log("startTime:", startTime);
    console.log("endTime:", endTime);
    console.log("monthlyRepeatBy:", monthlyRepeatBy);
    console.log("monthlyRepeatFrequency:", monthlyRepeatFrequency);
    console.log("repeatOn:", repeatOn);
    console.log("repeatDay:", repeatDay);
    console.log("weeklyRepeatDays:", weeklyRepeatDays);
  
    const dates = [];
    let currentDate = new Date(firstDate);
    const endDate = new Date(endByDate);
  
    // Helper function to get nth occurrence of a weekday in the month
    const getNthWeekdayOfMonth = (monthDate, weekday, nth) => {
      const firstDay = new Date(monthDate);
      firstDay.setDate(1); // Start at the first day of the month
      const firstWeekday = firstDay.getDay(); // Day of the week for the first day
      let dayOffset = weekday - firstWeekday;
      if (dayOffset < 0) dayOffset += 7;
  
      // Adjust for nth occurrence (e.g., first Sunday)
      firstDay.setDate(1 + dayOffset + (nth - 1) * 7);
      return firstDay;
    };
  
    // Map weekday names to corresponding day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeekMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
  
    // Parse repeatDay to get corresponding weekday number (e.g., "Sunday" -> 0)
    const repeatDayIndex = dayOfWeekMap[repeatDay];
  
    // Parse repeatOn to get the nth occurrence (e.g., "First" -> 1)
    const nthOccurrenceMap = {
      First: 1,
      Second: 2,
      Third: 3,
      Fourth: 4,
      Fifth: 5,
    };
    const nthOccurrence = nthOccurrenceMap[repeatOn];
  
    // Convert "2 months" to the numeric interval
    const repeatInterval = parseInt(monthlyRepeatFrequency.split(" ")[0]);
  
    // Generate recurring dates based on the input frequency
    if (repeatFrequency === "daily") {
      // Daily recurrence logic
      while (currentDate <= endDate) {
        dates.push({
          date: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`, // Format to DD-MM-YYYY
          startTime: startTime, // Use user-inputted start time
          endTime: endTime, // Use user-inputted end time
        });
        currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
      }
    } else if (repeatFrequency === "monthly") {
      if (monthlyRepeatBy === "Date of Month") {
        // Monthly recurrence by date of the month
        while (currentDate <= endDate) {
          dates.push({
            date: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`, // Format to DD-MM-YYYY
            startTime: startTime, // Use user-inputted start time
            endTime: endTime, // Use user-inputted end time
          });
          currentDate.setMonth(currentDate.getMonth() + repeatInterval); // Move to the next month
        }
      } else if (monthlyRepeatBy === "Day of Week") {
        // Monthly recurrence logic (nth weekday of the month)
        while (currentDate <= endDate) {
          const nthWeekday = getNthWeekdayOfMonth(
            currentDate,
            repeatDayIndex,
            nthOccurrence
          );
  
          // If the nth weekday is within the end date range, add it to the list
          if (nthWeekday <= endDate) {
            dates.push({
              date: `${nthWeekday.getDate()}-${nthWeekday.getMonth() + 1}-${nthWeekday.getFullYear()}`, // Format to DD-MM-YYYY
              startTime: startTime, // Use user-inputted start time
              endTime: endTime, // Use user-inputted end time
            });
          }
  
          // Move to the next month based on the repeat interval
          currentDate.setMonth(currentDate.getMonth() + repeatInterval);
        }
      }
    } else if (repeatFrequency === "weekly") {
      // Weekly recurrence logic
      const selectedWeekdays = weeklyRepeatDays.map((day) => dayOfWeekMap[day]); // Get the selected weekdays
  
      // Loop through each selected weekday and calculate the recurrence
      selectedWeekdays.forEach((weekday) => {
        let nextOccurrence = new Date(currentDate);
  
        // Calculate the first occurrence of the selected weekday
        const dayOffset = (weekday - nextOccurrence.getDay() + 7) % 7;
        nextOccurrence.setDate(nextOccurrence.getDate() + dayOffset);
  
        // Add occurrences for each week within the range
        while (nextOccurrence <= endDate) {
          dates.push({
            date: `${nextOccurrence.getDate()}-${nextOccurrence.getMonth() + 1}-${nextOccurrence.getFullYear()}`, // Format to DD-MM-YYYY
            startTime: startTime, // Use user-inputted start time
            endTime: endTime, // Use user-inputted end time
          });
          nextOccurrence.setDate(nextOccurrence.getDate() + 7); // Move to the next week
        }
      });
    }
  
    return dates;
  };
  
  

  // Generate recurring dates based on the input frequency
  const recurringDates = generateRecurringDates(firstDate, endByDate, repeatFrequency, startTime, endTime, monthlyRepeatBy, monthlyRepeatFrequency, repeatOn, repeatDay, weeklyRepeatDays);

  return (
    <div className="event-summary">
      <h3>Event Summary</h3>
      <div>
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
