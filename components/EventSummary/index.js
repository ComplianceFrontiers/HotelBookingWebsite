import React from "react";
import axios from "axios";

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
  repeatDay,
}) => {
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const { email } = userDetails;

  // Function to render selected weekly repeat days
  const renderWeeklyRepeatDays = () => {
    return Object.keys(weeklyRepeatDays)
      .filter((day) => weeklyRepeatDays[day])
      .join(", ");
  };

  // Function to render monthly repeat details
  const renderMonthlyRepeatDetails = () => {
    if (monthlyRepeatBy === "Day of Week") {
      return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy}`;
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
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6
    };
    
    const repeatDayIndex = dayOfWeekMap[repeatDay];
    const nthOccurrenceMap = {
      First: 1,
      Second: 2,
      Third: 3,
      Fourth: 4,
      Fifth: 5,
    };
    const nthOccurrence = nthOccurrenceMap[repeatOn];
    const repeatInterval = parseInt(monthlyRepeatFrequency.split(" ")[0]);

    if (repeatFrequency === "daily") {
      while (currentDate <= endDate) {
        dates.push({
          date: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`, // Format to DD-MM-YYYY
          startTime: startTime, // Use user-inputted start time
          endTime: endTime, // Use user-inputted end time
        });
        currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
      }
    } 
    else if (repeatFrequency === "monthly") {
      if (monthlyRepeatBy === "dateOfMonth") {
        // Monthly recurrence by date of the month
        while (currentDate <= endDate) {
          dates.push({
            date: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`, // Format to DD-MM-YYYY
            startTime: startTime, // Use user-inputted start time
            endTime: endTime, // Use user-inputted end time
          });
          currentDate.setMonth(currentDate.getMonth() + repeatInterval); // Move to the next month
        }
      } 
      
      
      else if (monthlyRepeatBy === "Day of Week") {
        while (currentDate <= endDate) {
          const nthWeekday = getNthWeekdayOfMonth(
            currentDate,
            repeatDayIndex,
            nthOccurrence
          );
          if (nthWeekday <= endDate) {
            dates.push({
              date: `${nthWeekday.getDate()}-${nthWeekday.getMonth() + 1}-${nthWeekday.getFullYear()}`, // Format to DD-MM-YYYY
              startTime: startTime, // Use user-inputted start time
              endTime: endTime, // Use user-inputted end time
            });
          }
          currentDate.setMonth(currentDate.getMonth() + repeatInterval);
        }
      }
    }
    else if (repeatFrequency === "weekly") {
      const selectedWeekdays = Object.keys(weeklyRepeatDays)
        .filter((day) => weeklyRepeatDays[day]) // Get the selected weekdays
        .map((day) => dayOfWeekMap[day]); // Map to corresponding day of the week
    
      selectedWeekdays.forEach((weekday) => {
        let nextOccurrence = new Date(currentDate);
    
        // Calculate the first occurrence of the selected weekday
        let dayOffset = (weekday - nextOccurrence.getDay() + 7) % 7;
    
        // If dayOffset is 0, don't skip to next week, instead, use the current date
        if (dayOffset === 0) {
          nextOccurrence = new Date(currentDate); // Use the current day as the first occurrence
        } else {
          nextOccurrence.setDate(nextOccurrence.getDate() + dayOffset); // Otherwise, move to the next occurrence
        }
    
        // Add occurrences for each week within the range
        while (nextOccurrence <= endDate) {
          dates.push({
            date: `${nextOccurrence.getDate()}-${nextOccurrence.getMonth() + 1}-${nextOccurrence.getFullYear()}`,
            startTime: startTime,
            endTime: endTime,
          });
          nextOccurrence.setDate(nextOccurrence.getDate() + 7); // Move to the next week
        }
      });
    }
  
    return dates;
  };

  const recurringDates = generateRecurringDates(
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
  );

  const handleCheckout = async () => {
    const bookedDates = 
    recurringDates.length === 0 && dateOption === "One-Time" 
      ? dateRows 
      : recurringDates;
    const bookingDetails = {
      event_name: formData.eventName,
      attendance: formData.attendance,
      room_type: formData.roomType,
      date_option: dateOption,
      booked_dates: bookedDates,
    };

    try {
      const response = await axios.post("https://hotel-website-backend-eosin.vercel.app/checkout", {
        email,
        booked_details: bookingDetails,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error during checkout:", error.response.data);
      alert("Error: " + error.response.data.error);
    }
  };

  return (
    <div className="step2-container">
      <h3 style={{ backgroundColor: "#0078d7", fontFamily: "Monster", fontSize: "1.2rem", padding: "10px", color: "#fff" }}>Event Summary</h3>
      <div className="event-location">
        <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Event Name:</strong> {formData.eventName}</p>
        <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Attendance:</strong> {formData.attendance}</p>
        <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Room Type:</strong> {formData.roomType}</p>

         <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Date Option:</strong> {dateOption}</p>
        {/* <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Repeat Frequency:</strong> {repeatFrequency}</p> */}

        {repeatFrequency === "weekly" && (
          <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Weekly Repeat Days:</strong> {renderWeeklyRepeatDays()}</p>
        )}

        {repeatFrequency === "monthly" && (
          <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>Monthly Repeat:</strong> {renderMonthlyRepeatDetails()}</p>
        )}

        {dateOption === "Recurring" && (
          <>
            <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>First Date:</strong> {firstDate}</p>
            <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}><strong>End By:</strong> {endByDate}</p>

            {/* Display recurring dates in a table format */}
            <div>
              <h4 style={{ fontFamily: "Monster", fontSize: "1rem" }}>Recurring Dates:</h4>
              <p style={{ fontFamily: "Monster", fontSize: "0.9rem" }}>These are the dates and times your event will occur:</p>
              <table style={{ fontFamily: "Monster", fontSize: "0.9rem", width: "100%", border: "1px solid #ddd", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Start Time</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>End Time</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Conflicts</th> {/* New column */}
                  </tr>
                </thead>
                <tbody>
      {recurringDates.map((row, index) => (
        <tr key={index}>
                      <td style={{ padding: "8px" }}>{row.date}</td>
                      <td style={{ padding: "8px" }}>{row.startTime}</td>
                      <td style={{ padding: "8px" }}>{row.endTime}</td>
                      <td style={{ padding: "8px" }}></td> {/* Empty value for "Conflicts" */}
        </tr>
      ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {dateOption === "One-Time" && (
          <div>
            <h4 style={{ fontFamily: "Monster", fontSize: "1rem" }}>One-Time Event Dates:</h4>
            <table style={{ fontFamily: "Monster", fontSize: "0.9rem", width: "100%", border: "1px solid #ddd", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Start Time</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>End Time</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Conflicts</th> {/* New column */}
                </tr>
              </thead>
              <tbody>
                {dateRows.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px" }}>{row.date}</td>
                    <td style={{ padding: "8px" }}>{row.startTime}</td>
                    <td style={{ padding: "8px" }}>{row.endTime}</td>
                    <td style={{ padding: "8px" }}></td> {/* Empty value for "Conflicts" */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default EventSummary;
