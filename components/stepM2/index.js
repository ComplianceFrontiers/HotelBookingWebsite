import React, { useState } from "react";
import EventSummary from "../EventSummary";

const StepM2 = ({ setActiveStep, formData }) => {
  const [dateRows, setDateRows] = useState([{ date: "", startTime: "", endTime: "" }]);
  const [dateOption, setDateOption] = useState("One-Time");
  const [repeatFrequency, setRepeatFrequency] = useState("");
  const [weeklyRepeatDays, setWeeklyRepeatDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [monthlyRepeatBy, setMonthlyRepeatBy] = useState("Day of Week");
  const [monthlyRepeatFrequency, setMonthlyRepeatFrequency] = useState("1 month");
  const [repeatOn, setRepeatOn] = useState("First");
const [repeatDay, setRepeatDay] = useState("Sunday");


  // New state variables for first date and end by date
  const [firstDate, setFirstDate] = useState("");
  const [endByDate, setEndByDate] = useState("");

  const addAdditionalDate = () => {
    setDateRows([...dateRows, { date: "", startTime: "", endTime: "" }]);
  };

  const deleteRow = (index) => {
    const updatedRows = dateRows.filter((_, i) => i !== index);
    setDateRows(updatedRows);
  };

  const handleDateChange = (index, field, value) => {
    const updatedRows = [...dateRows];
    updatedRows[index][field] = value;
    setDateRows(updatedRows);
  };

  const handleDateOptionChange = (e) => {
    setDateOption(e.target.value);
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
  const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");

  const handleRepeatFrequencyChange = (e) => {
    setRepeatFrequency(e.target.value);
  };

  const handleWeeklyRepeatDayChange = (day) => {
    setWeeklyRepeatDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleMonthlyRepeatByChange = (e) => {
    setMonthlyRepeatBy(e.target.value);
  };

  const handleMonthlyRepeatFrequencyChange = (e) => {
    setMonthlyRepeatFrequency(e.target.value);
  };

  return (
    <div className="step2-container">
      <div className="event-review">
        <h3>Event Review</h3>
        <div className="review-details">
          <p><strong>Organization:</strong> Compliance Frontiers LLC</p>
          <p><strong>Room Type:</strong> {formData.roomType}</p>
          <p><strong>Event Name:</strong> {formData.eventName}</p>
          <p><strong>Anticipated Attendance:</strong> {formData.attendance}</p>
        </div>
      </div>

      <div className="event-location">
        <h3>Event Location and Dates</h3>
        <div className="form-group">
          <label>School *</label>
          <select>
            <option>Leasure Elementary</option>
            <option>Other School</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date Option *</label>
          <select value={dateOption} onChange={handleDateOptionChange}>
            <option>One-Time</option>
            <option>Recurring</option>
          </select>
        </div>

        {dateOption === "Recurring" && (
          <div>
            <div className="form-group">
              <label>First Date *</label>
              <input type="date" value={firstDate} onChange={(e) => setFirstDate(e.target.value)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Start Time *</label>
                <input   type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>End Time *</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />              </div>
            </div>

            <div className="form-group">
              <label>Repeat *</label>
              <select value={repeatFrequency} onChange={handleRepeatFrequencyChange}>
                <option value="">Select</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {repeatFrequency === "daily" && (
              <div>
                 
                <div className="form-group">
                  <label>End By *</label>
                  <input type="date" value={endByDate} onChange={(e) => setEndByDate(e.target.value)} />
                </div>
              </div>
            )}

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
                  <label>End By *</label>
                  <input type="date" value={endByDate} onChange={(e) => setEndByDate(e.target.value)} />
                </div>
              </div>
            )}

            {repeatFrequency === "monthly" && (
              <div>
                <div className="form-group">
                  <label>Repeat By *</label>
                  <select value={monthlyRepeatBy} onChange={handleMonthlyRepeatByChange}>
                    <option value="Day of Week">Day of Week</option>
                    <option value="Date of Month">Date of Month</option>
                  </select>
                </div>
                {monthlyRepeatBy === "Day of Week" && (
                  <div className="form-group">
                    <label>Repeat On *</label>
                    <select value={repeatOn} onChange={(e) => setRepeatOn(e.target.value)}>

                      <option>First</option>
                      <option>Second</option>
                      <option>Third</option>
                      <option>Fourth</option>
                    </select>
                    <select value={repeatDay} onChange={(e) => setRepeatDay(e.target.value)}>

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
                <div className="form-group">
                  <label>End By *</label>
                  <input type="date" value={endByDate} onChange={(e) => setEndByDate(e.target.value)} />
                </div>
              </div>
            )}
          </div>
        )}

        {dateOption === "One-Time" && (
          <div className="date-table">
            {/* Table for one-time events */}
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
                        onChange={(e) => handleDateChange(index, "date", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={row.startTime}
                        onChange={(e) => handleDateChange(index, "startTime", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={row.endTime}
                        onChange={(e) => handleDateChange(index, "endTime", e.target.value)}
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
            <button type="button" onClick={addAdditionalDate}>Add Additional Date</button>
          </div>
        )}
      </div>

      <EventSummary
  formData={formData}
  dateOption={dateOption}
  repeatFrequency={repeatFrequency}
  weeklyRepeatDays={Object.keys(weeklyRepeatDays).filter((day) => weeklyRepeatDays[day])} // Pass selected weekdays
  monthlyRepeatBy={monthlyRepeatBy}
  monthlyRepeatFrequency={monthlyRepeatFrequency}
  dateRows={dateRows}
  firstDate={firstDate}
  endByDate={endByDate}
  startTime={startTime}
  endTime={endTime}
  repeatOn={repeatOn} // Pass repeatOn
  repeatDay={repeatDay} // Pass repeatDay
/>



      <div className="actions">
        <button onClick={() => setActiveStep(1)}>Back</button>
        <button onClick={() => setActiveStep(3)}>Next</button>
      </div>
    </div>
  );
};

export default StepM2;
