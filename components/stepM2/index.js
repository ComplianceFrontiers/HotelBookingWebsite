import React, { useState, useEffect } from 'react';

const StepM2 = ({ setActiveStep, formData, setFormData }) => {
  const [dateRows, setDateRows] = useState(formData.dateRows || []);
  const [dateOption, setDateOption] = useState(formData.dateOption || "");
  const [repeatFrequency, setRepeatFrequency] = useState(formData.repeatFrequency || "");
  const [weeklyRepeatDays, setWeeklyRepeatDays] = useState(
    formData.weeklyRepeatDays || {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    }
  );
  const [monthlyRepeatBy, setMonthlyRepeatBy] = useState(formData.monthlyRepeatBy || "");
  const [monthlyRepeatFrequency, setMonthlyRepeatFrequency] = useState(formData.monthlyRepeatFrequency || "1 month");
  const [repeatOn, setRepeatOn] = useState(formData.repeatOn || "");
  const [repeatDay, setRepeatDay] = useState(formData.repeatDay || "");
  const [firstDate, setFirstDate] = useState(formData.firstDate || "");
  const [endByDate, setEndByDate] = useState(formData.endByDate || "");
  const [startTime, setStartTime] = useState(formData.startTime || "");
  const [endTime, setEndTime] = useState(formData.endTime || "");
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    // Validation logic for enabling "Next" button
    const isStartEndTimeValid =
      startTime && endTime && startTime < endTime; // Ensure start time is less than end time

    const isValidRecurring =
      dateOption === "Recurring" &&
      firstDate &&
      startTime &&
      endTime &&
      isStartEndTimeValid && // Check if start time is less than end time
      repeatFrequency &&
      ((repeatFrequency === "weekly" && Object.values(weeklyRepeatDays).some(Boolean)) ||
        (repeatFrequency === "monthly" && monthlyRepeatBy && monthlyRepeatFrequency) ||
        repeatFrequency === "daily") &&
      endByDate;

    const isValidOneTime =
      dateOption === "One-Time" &&
      dateRows.every(
        (row) =>
          row.date &&
          row.startTime &&
          row.endTime &&
          row.startTime < row.endTime // Ensure each start time is less than end time
      );

    setIsNextEnabled(
      (dateOption === "Recurring" && isValidRecurring) ||
        (dateOption === "One-Time" && isValidOneTime)
    );
  }, [
    dateOption,
    dateRows,
    firstDate,
    startTime,
    endTime,
    repeatFrequency,
    weeklyRepeatDays,
    monthlyRepeatBy,
    monthlyRepeatFrequency,
    endByDate,
  ]);
 
  const addAdditionalDate = () => {
    setDateRows([...dateRows, { date: "", startTime: "", endTime: "" }]);
  };

  const deleteRow = (index) => {
    const updatedRows = dateRows.filter((_, i) => i !== index);
    setDateRows(updatedRows);
  };
  const handleWeeklyRepeatDayChange = (day) => {
    setWeeklyRepeatDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };
  const handleDateChange = (index, field, value) => {
    const updatedRows = [...dateRows];
    updatedRows[index][field] = value;

    // Validate start time and end time
    if (updatedRows[index].startTime && updatedRows[index].endTime && updatedRows[index].startTime >= updatedRows[index].endTime) {
      alert("Start time must be earlier than End time.");
      return;
    }

    setDateRows(updatedRows);
  };

  const handleDateOptionChange = (e) => {
    const newDateOption = e.target.value;
    setDateOption(newDateOption);
    setFormData((prev) => ({
      ...prev,
      dateOption: newDateOption,
    }));

    if (newDateOption === "One-Time") {
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
      setMonthlyRepeatBy("");
      setMonthlyRepeatFrequency("");
    }
  };

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);
    if (endTime && value >= endTime) {
      alert("Start time must be earlier than End time.");
    }
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    setEndTime(value);
    if (startTime && value <= startTime) {
      alert("End time must be later than Start time.");
    }
  };

  return (
    <div className="step2-container">
      <div className="event-review">
        <h3>Event Review</h3>
        <div className="review-details">
          <p><strong>Full Name:</strong> {formData.full_name}</p>
          <p><strong>Room Type:</strong> {formData.roomType}</p>
          <p><strong>Event Name:</strong> {formData.eventName}</p>
          <p><strong>Event Description:</strong> {formData.eventDescription}</p>
          <p><strong>Organization type:</strong> {formData.organization_type}</p>
          <p><strong>Anticipated Attendance:</strong> {formData.attendance}</p>
        </div>
      </div>

      <div className="event-location">
        <h3>Event Dates</h3>
        <div className="form-group">
          <label>Date Option *</label>
          <select value={dateOption} onChange={handleDateOptionChange}>
            <option>Select</option>
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
                <input type="time" value={startTime} onChange={handleStartTimeChange} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>End Time *</label>
                <input type="time" value={endTime} onFocus={() => setEndTime("")}  onChange={handleEndTimeChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Repeat *</label>
              <select value={repeatFrequency} onChange={(e) => setRepeatFrequency(e.target.value)}>
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
                  <select value={monthlyRepeatBy} onChange={(e) => setMonthlyRepeatBy(e.target.value)}>
                    <option value="">Select</option>
                    <option value="dateOfMonth">Date of Month</option>
                    <option value="dayOfWeek">Day Of Week</option>
                  </select>
                </div>
                {monthlyRepeatBy === "dayOfWeek" && (
                  <div className="form-group">
                    <label>Repeat On *</label>
                    <select value={repeatOn} onChange={(e) => setRepeatOn(e.target.value)}>
                    <option>Select</option>
                      <option>First</option>
                      <option>Second</option>
                      <option>Third</option>
                      <option>Fourth</option>
                    </select>
                    <select value={repeatDay} onChange={(e) => setRepeatDay(e.target.value)}>
                    <option>Select</option>

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
                  <label>End By *</label>
                  <input type="date" value={endByDate} onChange={(e) => setEndByDate(e.target.value)} />
                </div>
              </div>
            )}
          </div>
        )}

        {dateOption === "One-Time" && (
          <div className="date-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Delete</th>
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
                      <button onClick={() => deleteRow(index)}>Delete</button>
                    </td>
                  </tr>
            ))}
              </tbody>
            </table>
          </div>
        )}
        {dateOption === "One-Time" && (<button onClick={addAdditionalDate} className="btn-add" >Add Date</button>)}
       
        <div className="navigation-buttons">
          <button
            onClick={() => setActiveStep(1)}
            className="btn-back"
          >
            Back
          </button>
          <button
            onClick={() => {
              setFormData({
                ...formData,
                dateRows,
                dateOption,
                repeatFrequency,
                firstDate,
                endByDate,
                startTime,
                endTime,
                weeklyRepeatDays,
                monthlyRepeatBy,
                monthlyRepeatFrequency,
                repeatOn,
                repeatDay,
              });
              setActiveStep(3);
            }}
            className="btn-add"
            disabled={!isNextEnabled} // Button is disabled if validation fails
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepM2;
