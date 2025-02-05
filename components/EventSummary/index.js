import React, { useState, useEffect } from "react";
import axios from "axios";
import StepM4 from '../../components/stepM4';

const EventSummary = ({
  setActiveStep,
  setAdminCurrentStep,
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

  const [conflictDates, setConflictDates] = useState([]); // To hold conflicting dates
  const [isContinueDisabled, setIsContinueDisabled] = useState(true); // Track button state

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDateRows = dateRows.map((row) => ({
    ...row,
    date: formatDate(row.date),
  }));
  const fetchBookedDates = async () => {
    try {
      const response = await axios.get(
        "https://hotel-website-backend-eosin.vercel.app/users/already_booked_dates",
        {
          params: {
            room_type: formData.roomType,  // Pass roomType in the request query
          },
        }
      );
  
      // Ensure response.data is an array and has elements
      if (Array.isArray(response.data) && response.data.length > 0) {
        const bookedDates = response.data[0]?.booked_dates || []; // Default to an empty array if undefined
  
        const datesToCheck = recurringDates1.length > 0 ? recurringDates1 : dateRows.map(row => {
          // Check if the date is already in the "DD-MM-YYYY" format
          const isFormatted = /^\d{1,2}-\d{1,2}-\d{4}$/.test(row.date);
  
          if (isFormatted) {
            return row; // If already in the desired format, return the row as it is
          }
  
          const date = new Date(row.date);
          const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          return { ...row, date: formattedDate };
        });
  
        function normalizeDate(date) {
          const [day, month, year] = date.split("-").map((val) => val.padStart(2, "0"));
          return `${day}-${month}-${year}`;
        }
  
        const conflicts = datesToCheck.filter((recDate) => {
          return bookedDates.some((bookedDate) => {
            if (normalizeDate(bookedDate.date) === normalizeDate(recDate.date)) {
              const recStartTime = new Date(`1970-01-01T${recDate.startTime}:00`);
              const recEndTime = new Date(`1970-01-01T${recDate.endTime}:00`);
              const bookedStartTime = new Date(`1970-01-01T${bookedDate.startTime}:00`);
              const bookedEndTime = new Date(`1970-01-01T${bookedDate.endTime}:00`);
  
              // Check for time overlap
              return recStartTime < bookedEndTime && recEndTime > bookedStartTime;
            }
            return false;
          });
        });
  
        setConflictDates(conflicts);
        setIsContinueDisabled(conflicts.length > 0); // Disable the Continue button if there are conflicts
        if (conflicts.length > 0) {
          alert("There are conflicts with some of the dates! Please review the conflicting dates.");
        }
      } else {
        console.warn("Response data is not in the expected format or is empty:", response.data);
        setConflictDates([]); // No conflicts if no data
        setIsContinueDisabled(false); // Allow continuation if no conflicts
      }
    } catch (error) {
      console.error("Error fetching booked dates:", error);
      setConflictDates([]); // No conflicts in case of an error
      setIsContinueDisabled(false); // Allow continuation
    }
  };
  


  // Function to render selected weekly repeat days
  const renderWeeklyRepeatDays = () => {
    return Object.keys(weeklyRepeatDays)
      .filter((day) => weeklyRepeatDays[day])
      .join(", ");
  };

  // Function to render monthly repeat details
  const renderMonthlyRepeatDetails = () => {
    if (monthlyRepeatBy === "dayOfWeek") {
      return `${monthlyRepeatFrequency} on the ${monthlyRepeatBy}`;
    } else if (monthlyRepeatBy === "dateOfMonth") {
      return `${monthlyRepeatBy}`;
    }
    return "";
  };

  const generaterecurringDates1 = (
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
  
    const repeatDayIndex = dayOfWeekMap[repeatDay.toLowerCase()];  // Convert repeatDay to lowercase
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
          date: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
          startTime: startTime,
          endTime: endTime,
        });
        currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
      }
    }
    // Handling monthly recurrence
    else if (repeatFrequency === "monthly") {
      if (monthlyRepeatBy === "dateOfMonth") {
        while (currentDate <= endDate) {
          dates.push({
            date: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
            startTime: startTime,
            endTime: endTime,
          });
          currentDate.setMonth(currentDate.getMonth() + repeatInterval); // Increment by one month
        }
      }
      else if (monthlyRepeatBy === "dayOfWeek") {
        while (currentDate <= endDate) {
          const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
          const nthWeekday = getNthWeekdayOfMonth(firstDayOfMonth, repeatDayIndex, nthOccurrence);
  
          if (nthWeekday <= endDate) {
            dates.push({
              date: `${nthWeekday.getDate()}-${nthWeekday.getMonth() + 1}-${nthWeekday.getFullYear()}`,
              startTime: startTime,
              endTime: endTime,
            });
          }
  
          currentDate.setMonth(currentDate.getMonth() + repeatInterval); // Increment by one month
        }
        const filteredDates = dates.filter(dateObj => {
          const [day, month, year] = dateObj.date.split('-');
          const formattedDate = new Date(`${year}-${month}-${day}`); // Format to YYYY-MM-DD
          return formattedDate >= new Date(firstDate); // Compare with firstDate
        });
      
        dates.length = 0; // Clear the original dates array
        Array.prototype.push.apply(dates, filteredDates);
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
    
        // If dayOffset is 0, use the current date as the first occurrence
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
    
      // Filter out any dates that are earlier than the firstDate
      const filteredDates = dates.filter(dateObj => {
        const [day, month, year] = dateObj.date.split('-');
        const formattedDate = new Date(`${year}-${month}-${day}`); // Format to YYYY-MM-DD
        return formattedDate >= new Date(firstDate); // Compare with firstDate
      });
    
      dates.length = 0; // Clear the original dates array
      Array.prototype.push.apply(dates, filteredDates); // Populate the dates array with filtered dates
    }
    
  
   
   
     return dates;
  };
  
  
  const recurringDates1 = generaterecurringDates1(
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
  formData.recurringDates = recurringDates1;
  console.log("tttt",formData)
   

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const formattedDateRows1 = dateRows.map(row => {
    const date = new Date(row.date);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return { ...row, date: formattedDate };
  });

  return (
    <div className="step2-container">
        <div className="event-review">
      <h3 >Event Summary</h3>
    
      {formData.eventName && <p><strong>Event Name:</strong> {formData.eventName}</p>}
{formData.eventDescription && <p><strong>Event Description:</strong> {formData.eventDescription}</p>}
{formData.organization_type && <p><strong>Event Description:</strong> {formData.organization_type}</p>}
{formData.attendance && <p><strong>Attendance:</strong> {formData.attendance}</p>}
{formData.admin_name && <p><strong>Admin Name:</strong> {formData.admin_name}</p>}
{formData.reason && <p><strong>Reason For Blocking:</strong> {formData.reason}</p>}

        <p><strong>Room Type:</strong> {formData.roomType}</p>
        <p><strong>Date Option:</strong> {dateOption}</p>

        {/* Additional information for repeat frequencies */}
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
            <div className="step-m4-container">
          <div className="estimates-table">
              <h4 style={{  fontSize: "1rem" }}>Recurring Dates:</h4> 
              <table style={{  fontSize: "0.9rem", width: "100%", border: "1px solid #ddd", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Start Time</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>End Time</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Conflicts</th>
                  </tr>
                </thead>
                <tbody>
                  {recurringDates1.map((row, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px" }}>{row.date}</td>
                      <td style={{ padding: "8px" }}>{row.startTime}</td>
                      <td style={{ padding: "8px" }}>{row.endTime}</td>
                      <td style={{ padding: "8px", color: conflictDates.some(conflict => conflict.date === row.date) ? 'red' : 'green' }}>
                        {conflictDates.some(conflict => conflict.date === row.date) ? 'Conflict' : 'Available'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </>
        )}

        {dateOption === "One-Time" && (
          <div className="step-m4-container">
          <div className="estimates-table">
            <h4 style={{  fontSize: "1rem" }}>One-Time Event Dates:</h4>
            <table style={{  fontSize: "0.9rem", width: "100%", border: "1px solid #ddd", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Start Time</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>End Time</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Conflicts</th> 
                </tr>
              </thead>
              <tbody>
                {formattedDateRows1.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px" }}>{row.date}</td>
                    <td style={{ padding: "8px" }}>{row.startTime}</td>
                    <td style={{ padding: "8px" }}>{row.endTime}</td>          
                    <td style={{ padding: "8px", color: conflictDates.some(conflict => conflict.date === row.date) ? 'red' : 'green' }}>
                      {conflictDates.some(conflict => conflict.date === row.date) ? 'Conflict' : 'Available'}
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        )}
      
      <div className="navigation-buttons">
  <button 
    onClick={() => {
      if (formData.full_name === "Admin") {
        setAdminCurrentStep(2);
      } else {
        setActiveStep(1);
      }
    }} 
    className="btn-add"
  >
    Back
  </button>
  <button 
    onClick={() => {
      if (formData.full_name === "Admin") {
        setAdminCurrentStep(3);
      } else {
        setActiveStep(4);
      }
    }} 
    className="btn-add" 
    disabled={isContinueDisabled}
  >
    Continue
  </button>
</div>

     </div>
    </div>
  );
};

export default EventSummary;
