import React from 'react';

const StepM4 = ({ setActiveStep }) => {
  return (
    <div className="step-m4-container">
      <h2 className="step-title">Event Location and Dates</h2>
      <div className="event-form">
        <form>
          {/* School Dropdown */}
          <div className="form-group">
            <label htmlFor="school">School *</label>
            <select id="school" name="school" required>
              <option>Kathleen H. Wilbur Elementary</option>
            </select>
          </div>

          {/* Date Option Dropdown */}
          <div className="form-group">
            <label htmlFor="date-option">Date Option *</label>
            <select id="date-option" name="dateOption" required>
              <option>Recurring</option>
            </select>
            <small>Please include any setup and cleanup time in the event request.</small>
          </div>

          {/* Room/Field Input */}
          <div className="form-group">
            <label htmlFor="room-field">Room/Field(s) *</label>
            <input type="text" id="room-field" value="Blue/Orange Gymnasium" readOnly />
          </div>

          {/* First Date */}
          <div className="form-group">
            <label htmlFor="first-date">First Date *</label>
            <input type="date" id="first-date" value="2024-12-28" readOnly />
          </div>

          {/* Start Time and End Time */}
          <div className="form-group time-group">
            <label htmlFor="start-time">Start Time *</label>
            <input type="time" id="start-time" value="07:15" readOnly />
            <label htmlFor="end-time">End Time *</label>
            <input type="time" id="end-time" value="08:00" readOnly />
          </div>

          {/* Repeat Options */}
          <div className="form-group">
            <label htmlFor="repeats">Repeats *</label>
            <select id="repeats" name="repeats">
              <option>Weekly</option>
            </select>
          </div>

          {/* Repeat On */}
          <div className="form-group repeat-days">
            <label>Repeat On *</label>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <div key={index} className="checkbox">
                <input type="checkbox" id={day.toLowerCase()} defaultChecked={day === 'Friday'} />
                <label htmlFor={day.toLowerCase()}>{day}</label>
              </div>
            ))}
          </div>

          {/* Repeat Every */}
          <div className="form-group">
            <label htmlFor="repeat-every">Repeat Every *</label>
            <select id="repeat-every">
              <option>2 week(s)</option>
            </select>
          </div>

          {/* End By */}
          <div className="form-group">
            <label htmlFor="end-by">End By *</label>
            <input type="date" id="end-by" value="2025-03-14" readOnly />
          </div>
        </form>
      </div>

      <h2 className="additional-title">Additional Items</h2>
      <div className="additional-items">
        <form>
          <div className="form-group">
            <label htmlFor="item">Item *</label>
            <select id="item">
              <option value="">Select an item</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input type="number" id="quantity" min="1" />
          </div>
          <div className="form-group">
            <label htmlFor="dates">Date(s) *</label>
            <input type="text" id="dates" value="12/29/2024" readOnly />
          </div>
          <button type="button" className="btn-add">Add Item</button>
        </form>
      </div>

      <h3 className="estimates-title">Estimates for Request</h3>
      <table className="estimates-table">
        <thead>
          <tr>
            <th>Request Date</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Total Hours</th>
            <th>Estimated Base</th>
            <th>Rate</th>
            <th>Estimated Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12/29/2024 (Sun)</td>
            <td>Custodian Fee (Sunday Rate) [Required]</td>
            <td>1</td>
            <td>4.75*</td>
            <td>$50.00</td>
            <td>Per Hour</td>
            <td>$237.50</td>
          </tr>
          <tr>
            <td>12/29/2024 (Sun)</td>
            <td>Classroom - Class C [Required]</td>
            <td>1</td>
            <td>3.75</td>
            <td>$12.00</td>
            <td>Per Hour</td>
            <td>$45.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">Estimated Total Due:</td>
            <td>$282.50</td>
          </tr>
        </tfoot>
      </table>

      <div className="navigation-buttons">
        <button onClick={() => setActiveStep(3)} className="btn-back">Back</button>
        <button className="btn-submit">Submit Request</button>
      </div>
    </div>
  );
};

export default StepM4;
