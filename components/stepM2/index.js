import React, { useState } from "react";
import EventSummary from "../EventSummary";

const StepM2 = ({ setActiveStep, formData }) => {
  // State to manage additional date rows
  const [dateRows, setDateRows] = useState([
    { date: "", startTime: "", endTime: "" },
  ]);

  // State to manage the selected date option
  const [dateOption, setDateOption] = useState("One-Time");

  // State to manage the selected repeat frequency (weekly or monthly)
  const [repeatFrequency, setRepeatFrequency] = useState("");

  // State for Weekly repeat days and Repeat Every weeks
  const [weeklyRepeatDays, setWeeklyRepeatDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  // State for Monthly repeat options
  const [monthlyRepeatBy, setMonthlyRepeatBy] = useState("Day of Week");
  const [monthlyRepeatFrequency, setMonthlyRepeatFrequency] = useState("1 month");

  // Function to add a new row
  const addAdditionalDate = () => {
    setDateRows([...dateRows, { date: "", startTime: "", endTime: "" }]);
  };

  // Function to delete a specific row
  const deleteRow = (index) => {
    const updatedRows = dateRows.filter((_, i) => i !== index);
    setDateRows(updatedRows);
  };

  // Function to update the value of a specific row
  const handleDateChange = (index, field, value) => {
    const updatedRows = [...dateRows];
    updatedRows[index][field] = value;
    setDateRows(updatedRows);
  };

  // Function to handle the selection of date options
  const handleDateOptionChange = (e) => {
    setDateOption(e.target.value);
    // Reset state when switching from recurring to one-time
    if (e.target.value === "One-Time") {
      setRepeatFrequency("");
      setWeeklyRepeatDays({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      });
      setMonthlyRepeatBy("Day of Week");
      setMonthlyRepeatFrequency("1 month");
    }
  };

  // Function to handle repeat frequency changes (weekly or monthly)
  const handleRepeatFrequencyChange = (e) => {
    setRepeatFrequency(e.target.value);
  };

  // Function to handle weekly repeat day changes
  const handleWeeklyRepeatDayChange = (day) => {
    setWeeklyRepeatDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  // Function to handle monthly repeat by changes
  const handleMonthlyRepeatByChange = (e) => {
    setMonthlyRepeatBy(e.target.value);
  };

  // Function to handle monthly repeat frequency changes
  const handleMonthlyRepeatFrequencyChange = (e) => {
    setMonthlyRepeatFrequency(e.target.value);
  };

  return (
    <div className="step2-container">
      {/* Event Review Section */}
      <div className="event-review">
        <h3>Event Review</h3>
        <div className="review-details">
          <p>
            <strong>Organization:</strong> Compliance Frontiers LLC
          </p>
          <p>
            <strong>Room Type:</strong> {formData.roomType}
          </p>
          <p>
            <strong>Event Name:</strong> {formData.eventName}
          </p>
          <p>
            <strong>Anticipated Attendance:</strong> {formData.attendance}
          </p>
        </div>
      </div>

      {/* Event Location and Dates Section */}
      <div className="event-location">
        <h3>Event Location and Dates</h3>
        <div className="form-group">
          <label>School *</label>
          <select>
            <option>Leasure Elementary</option>
            <option>Other School</option>
          </select>
        </div>

        {/* Date Option */}
        <div className="form-group">
          <label>Date Option *</label>
          <select value={dateOption} onChange={handleDateOptionChange}>
            <option>One-Time</option>
            <option>Recurring</option>
          </select>
        </div>

        {/* Recurring Event Fields */}
        {dateOption === "Recurring" && (
          <div>
    {/* First Date */}
    <div className="form-group">
      <label>First Date *</label>
      <input type="date" />
    </div>

    {/* Start Time and End Time */}
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
      <div className="form-group" style={{ flex: 1 }}>
        <label>Start Time *</label>
        <input type="time" style={{ width: '100%' }} />
      </div>

      <div className="form-group" style={{ flex: 1 }}>
        <label>End Time *</label>
        <input type="time" style={{ width: '100%' }} />
      </div>
    </div>

            {/* Repeat Frequency */}
            <div className="form-group">
              <label>Repeat *</label>
              <select value={repeatFrequency} onChange={handleRepeatFrequencyChange}>
                <option value="">Select</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Weekly Repeat Fields */}
            {repeatFrequency === "weekly" && (
              <div>
                <div className="form-group">
                  <label>Repeat On *</label>
                  <div>
                    {Object.keys(weeklyRepeatDays).map((day) => (
                      <label key={day}>
                        <input
                          type="checkbox"
                          checked={weeklyRepeatDays[day]}
                          onChange={() => handleWeeklyRepeatDayChange(day)}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Repeat Every *</label>
                  <select>
                    <option>1 week(s)</option>
                    <option>2 week(s)</option>
                    <option>3 week(s)</option>
                    <option>4 week(s)</option>
                    <option>5 week(s)</option>
                  </select>
                </div>

                {/* End By Field */}
                <div className="form-group">
                  <label>End By *</label>
                  <input type="date" />
                </div>
              </div>
            )}

            {/* Monthly Repeat Fields */}
            {repeatFrequency === "monthly" && (
              <div>
                <div className="form-group">
                  <label>Repeat By *</label>
                  <select value={monthlyRepeatBy} onChange={handleMonthlyRepeatByChange}>
                    <option value="Day of Week">Day of Week</option>
                    <option value="Day of Month">Day of Month</option>
                  </select>
                </div>
                {monthlyRepeatBy === "Day of Week" && (
                  <div className="form-group">
                    <label>Repeat On *</label>
                    <select>
                      <option>First</option>
                      <option>Second</option>
                      <option>Third</option>
                      <option>Fourth</option>
                    </select>
                    <select>
                      <option>Sunday</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label>Repeat Every *</label>
                  <select value={monthlyRepeatFrequency} onChange={handleMonthlyRepeatFrequencyChange}>
                    <option value="1 month">1 month(s)</option>
                    <option value="2 months">2 month(s)</option>
                    <option value="3 months">3 month(s)</option>
                    <option value="4 months">4 month(s)</option>
                    <option value="5 months">5 month(s)</option>
                  </select>
                </div>
              </div>
            )}

            {/* End By Field (Only for Recurring Events) */}
            {repeatFrequency !== "weekly" && (
              <div className="form-group">
                <label>End By *</label>
                <input type="date" />
              </div>
            )}
          </div>
        )}

        {/* Dynamic Date Table for One-Time Events */}
        {dateOption === "One-Time" && (
          <div className="date-table">
            <table>
              <thead>
                <tr>
                  <th>Date *</th>
                  <th>Start Time *</th>
                  <th>End Time *</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dateRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) =>
                          handleDateChange(index, "date", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={row.startTime}
                        onChange={(e) =>
                          handleDateChange(index, "startTime", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={row.endTime}
                        onChange={(e) =>
                          handleDateChange(index, "endTime", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => deleteRow(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={addAdditionalDate}>
              Add Additional Date
            </button>
          </div>
        )}
      </div>

      {/* Event Summary */}
      <EventSummary
        formData={formData}
        dateOption={dateOption}
        repeatFrequency={repeatFrequency}
        weeklyRepeatDays={weeklyRepeatDays}
        monthlyRepeatBy={monthlyRepeatBy}
        monthlyRepeatFrequency={monthlyRepeatFrequency}
        dateRows={dateRows}
      />

      {/* Buttons for Navigation */}
      <div className="button-container">
        <button onClick={() => setActiveStep(0)}>Back</button>
        <button onClick={() => setActiveStep(2)}>Next</button>
      </div>
    </div>
  );
};

export default StepM2;
