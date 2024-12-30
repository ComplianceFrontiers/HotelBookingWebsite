import React from 'react';

const StepM2 = ({ setActiveStep, formData }) => {
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
        <div className="form-group">
          <label>Date Option *</label>
          <select>
            <option>Recurring</option>
            <option>One-Time</option>
          </select>
          <small>
            Please include any setup and cleanup time in event request.
          </small>
        </div>
        <div className="date-table">
          <table>
            <thead>
              <tr>
                <th>Date *</th>
                <th>Start Time *</th>
                <th>End Time *</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="date" />
                </td>
                <td>
                  <input type="time" />
                </td>
                <td>
                  <input type="time" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <button>Add Additional Date</button>
          <button onClick={() => setActiveStep(3)}>Continue</button>
          <button onClick={() => setActiveStep(1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default StepM2;
