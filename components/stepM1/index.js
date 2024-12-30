import React from 'react';

const StepM1 = ({ setActiveStep, setFormData, formData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select room type
                </option>
                <option value="gym">Gym</option>
                <option value="multi-purpose-room">Multi-Purpose Room</option>
                <option value="conference-center">Conference Center</option>
                <option value="auditorium">Auditorium</option>
                <option value="pavilion">Pavilion</option>
                <option value="firepit">Firepit</option>
              </select>
            </div>
            <div className="form-group">
              <label>Event Name *</label>
              <input
                type="text"
                name="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Anticipated Attendance *</label>
              <input
                type="number"
                name="attendance"
                placeholder="Enter attendance"
                value={formData.attendance}
                onChange={handleInputChange}
                required
              />
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
