import React from "react";

const EventSummary = ({ formData, dateOption, repeatFrequency, weeklyRepeatDays, monthlyRepeatBy, monthlyRepeatFrequency, dateRows }) => {
  return (
    <div className="event-summary">
      <h3>Event Summary</h3>
      <div className="summary-details">
        <p><strong>Organization:</strong> Compliance Frontiers LLC</p>
        <p><strong>Room Type:</strong> {formData.roomType}</p>
        <p><strong>Event Name:</strong> {formData.eventName}</p>
        <p><strong>Anticipated Attendance:</strong> {formData.attendance}</p>

        <p><strong>Date Option:</strong> {dateOption}</p>
        {dateOption === "Recurring" && (
          <>
            <p><strong>Repeat Frequency:</strong> {repeatFrequency}</p>
            {repeatFrequency === "weekly" && (
              <div>
                <strong>Weekly Repeat Days:</strong>
                <ul>
                  {Object.keys(weeklyRepeatDays).map((day) => (
                    weeklyRepeatDays[day] && <li key={day}>{day}</li>
                  ))}
                </ul>
              </div>
            )}
            {repeatFrequency === "monthly" && (
              <>
                <p><strong>Repeat By:</strong> {monthlyRepeatBy}</p>
                <p><strong>Repeat Every:</strong> {monthlyRepeatFrequency}</p>
              </>
            )}
          </>
        )}

        <h4>Dates:</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {dateRows.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.startTime}</td>
                <td>{row.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventSummary;
