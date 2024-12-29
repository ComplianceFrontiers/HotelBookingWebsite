import React from 'react';

const StepM1 = ({ setActiveStep }) => {
  return (
    <div className="step-m1-container">
      <h2 className="step-title">Submit New Request</h2>
      <p className="step-info">
        You will receive an email notification once your request has been approved.
      </p>
      <div className="step-content">
        <div className="event-info">
          <h3 className="section-title">Event Information</h3>
          <form className="event-form">
            <div className="form-group">
              <label>Organization</label>
              <span>Compliance Frontiers LLC</span>
            </div>
            <div className="form-group">
              <label>Event Name *</label>
              <input type="text" placeholder="Enter event name" />
            </div>
            <div className="form-group">
              <label>Anticipated Attendance *</label>
              <input type="number" placeholder="Enter attendance" />
            </div>
            <div className="form-group radio-group">
              <label>Is Admission Fee Charged?</label>
              <div>
                <input type="radio" id="no" name="admission" value="no" defaultChecked />
                <label htmlFor="no">No</label>
                <input type="radio" id="yes" name="admission" value="yes" />
                <label htmlFor="yes">Yes</label>
              </div>
            </div>
            <button
              type="button"
              className="btn-continue"
              onClick={() => setActiveStep(2)}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepM1;
