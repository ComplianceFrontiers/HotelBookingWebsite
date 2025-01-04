import React from 'react';
import EventSummary from '../EventSummary';

const StepM4 = ({ setActiveStep, formData = {} }) => {
  return (
    <div className="step-m4-container">
      <h2 className="step-title">Event Location and Dates</h2>
      <div className="event-form">
        <form>
          <div className="step3-container">
            <EventSummary
              setActiveStep={setActiveStep}
              formData={formData}
              dateOption={formData?.dateOption}
              repeatFrequency={formData?.repeatFrequency}
              weeklyRepeatDays={formData?.weeklyRepeatDays}
              monthlyRepeatBy={formData?.monthlyRepeatBy}
              monthlyRepeatFrequency={formData?.monthlyRepeatFrequency}
              dateRows={formData?.dateRows}
              firstDate={formData?.firstDate}
              endByDate={formData?.endByDate}
              startTime={formData?.startTime}
              endTime={formData?.endTime}
              repeatOn={formData?.repeatOn}
              repeatDay={formData?.repeatDay}
            />
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
