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
      
      <div className="step-content">
        <div className="event-info">
          <h3 className="section-title">Event Information</h3>
          <form className="event-form">
            <div className="form-group">
              <label>Full Name</label>
              <span>{formData.full_name}</span>
            </div>
            <div
  className="form-group"
  style={{
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <label
    style={{
      marginBottom: '5px',
      fontWeight: 'bold',
      fontSize: '13px',
      color: '#333',
    }}
  >
    Room Type *
  </label>
  <select
    name="roomType"
    value={formData.roomType}
    onChange={handleInputChange}
    required
    style={{
      padding: '10px',
      fontSize: '13px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      color: '#333',
    }}
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
