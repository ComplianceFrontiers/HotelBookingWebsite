import React, { useState } from 'react';

const StepM2 = ({ setActiveStep, formData, setFormData }) => {
  const [dateRows, setDateRows] = useState(formData.dateRows);
  const [dateOption, setDateOption] = useState(formData.dateOption);
  const [repeatFrequency, setRepeatFrequency] = useState(formData.repeatFrequency);
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
  );  const [monthlyRepeatBy, setMonthlyRepeatBy] = useState(formData.monthlyRepeatBy);
  const [monthlyRepeatFrequency, setMonthlyRepeatFrequency] = useState(formData.monthlyRepeatFrequency);
  const [repeatOn, setRepeatOn] = useState(formData.repeatOn);
  const [repeatDay, setRepeatDay] = useState(formData.repeatDay);
  const [firstDate, setFirstDate] = useState(formData.firstDate);
  const [endByDate, setEndByDate] = useState(formData.endByDate);
  const [startTime, setStartTime] = useState(formData.startTime);
  const [endTime, setEndTime] = useState(formData.endTime);

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
    const newDateOption = e.target.value;
    setDateOption(newDateOption);
    setFormData(prev => ({
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
      setMonthlyRepeatBy("dayOfWeek");
      setMonthlyRepeatFrequency("1 month");
    }
  };

  const handleRepeatFrequencyChange = (e) => {
    const value = e.target.value;
    setRepeatFrequency(value);
    setFormData(prev => ({
      ...prev,
      repeatFrequency: value,
    }));
  };

  const handleWeeklyRepeatDayChange = (day) => {
    const updatedWeeklyRepeatDays = { ...weeklyRepeatDays, [day]: !weeklyRepeatDays[day] };
    setWeeklyRepeatDays(updatedWeeklyRepeatDays);
    setFormData(prev => ({
      ...prev,
      weeklyRepeatDays: Object.keys(updatedWeeklyRepeatDays).filter(day => updatedWeeklyRepeatDays[day]),
    }));
  };

  const handleMonthlyRepeatByChange = (e) => {
    const value = e.target.value;
    setMonthlyRepeatBy(value);
    setFormData(prev => ({
      ...prev,
      monthlyRepeatBy: value,
    }));
  };
  

  const handleMonthlyRepeatFrequencyChange = (e) => {
    const value = e.target.value;
    setMonthlyRepeatFrequency(value);
    setFormData(prev => ({
      ...prev,
      monthlyRepeatFrequency: value,
    }));
  };

  return (
    <div className="step2-container">
      <div className="event-review">
        <h3>Event Review</h3>
        <div className="review-details">
          <p><strong>Full Name:</strong> {formData.full_name}</p>
          <p><strong>Room Type:</strong> {formData.roomType}</p>
          <p><strong>Event Name:</strong> {formData.eventName}</p>
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
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>End Time *</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
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
                  <option value="">Select</option>

                    <option value="dateOfMonth">Date of Month</option>
                    <option value="dayOfWeek">dayOfWeek</option>
                  </select>
                </div>
                {monthlyRepeatBy === "dayOfWeek" && (
                  <div>
                    <div className="form-group">
                      <label>Repeat Frequency (in months) *</label>
                      <select value={monthlyRepeatFrequency} onChange={handleMonthlyRepeatFrequencyChange}>
                        <option value="1">1 month</option>
                        <option value="2">2 months</option>
                        <option value="3">3 months</option>
                      </select>
                    </div>
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
        {dateOption === "One-Time" && (<button onClick={addAdditionalDate} className="btn-add"  >Add Date</button>)}
       
        <div className="navigation-buttons">
         <button
          onClick={() => {
            setFormData({
              ...formData,
              dateRows: dateRows,
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
          className="btn-add"        >
          Next
        </button>
        </div>
       </div>
    </div>
  );
};

export default StepM2;
