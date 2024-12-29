import React from 'react';

const StepM3 = ({ setActiveStep }) => {
  return (
    <div className="step-m3-container">
      <h2 className="step-title">Event Review</h2>
      <div className="event-review-section">
        <table className="event-review-table">
          <tbody>
            <tr>
              <td><strong>Organization</strong></td>
              <td>Compliance Frontiers LLC</td>
            </tr>
            <tr>
              <td><strong>District</strong></td>
              <td>Christina</td>
            </tr>
            <tr>
              <td><strong>Event Name</strong></td>
              <td>yoyo</td>
            </tr>
            <tr>
              <td><strong>Event Description</strong></td>
              <td>thf</td>
            </tr>
            <tr>
              <td><strong>Anticipated Attendance</strong></td>
              <td>34</td>
            </tr>
            <tr>
              <td><strong>Is Admission Fee Charged?</strong></td>
              <td>
                <input type="checkbox" disabled />
              </td>
            </tr>
            <tr>
              <td><strong>School</strong></td>
              <td>Maclary Elementary</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="event-dates-title">Event Dates</h3>
      <table className="event-dates-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Total Hours</th>
            <th>Room/Field(s)</th>
            <th>Other Bookings for Date</th>
            <th>Conflicts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12/29/2024 (Sun)</td>
            <td>11:15 AM - 3:00 PM</td>
            <td>3.75</td>
            <td>Classroom 020</td>
            <td>N/A</td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">Total: 1</td>
          </tr>
        </tfoot>
      </table>

      <div className="navigation-buttons">
        <button onClick={() => setActiveStep(2)} className="btn-back">Back</button>
        <button onClick={() => setActiveStep(4)} className="btn-continue">Continue</button>
      </div>
    </div>
  );
};

export default StepM3;
