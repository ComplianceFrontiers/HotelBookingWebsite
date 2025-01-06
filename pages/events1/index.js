import React, { useState, useEffect } from 'react';
import StepM1 from '../../components/stepM1';
import StepM2 from '../../components/stepM2';
import StepM3 from '../../components/stepM3';
import StepM4 from '../../components/stepM4';
import StepM5 from '../../components/stepM5'; // Import StepM5 component

const Events1 = () => {
  const [activeStep, setActiveStep] = useState(1); // Tracks the active step
  const [formData, setFormData] = useState({
    full_name: '',
    roomType: '',
    eventName: '',
    attendance: '',
    dateOption: '',
    repeatFrequency: '',
    weeklyRepeatDays: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
    monthlyRepeatBy: '',
    monthlyRepeatFrequency: '',
    dateRows: [],
    recurringDates: [],
    firstDate: '',
    endByDate: '',
    startTime: '',
    endTime: '',
    repeatOn: '',
    repeatDay: '',
  });

  // Set default full_name from localStorage if available
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    if (userDetails && userDetails.full_name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        full_name: userDetails.full_name,
      }));
    }
  }, []);

  return (
    <div className="events-container">
      <div className="steps-content">
        {activeStep === 1 && (
          <StepM1 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
        )}
        {activeStep === 2 && (
          <StepM2 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
        )}
        {activeStep === 3 && (
          <StepM3 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
        )}
        {activeStep === 4 && (
          <StepM4 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
        )}
        {activeStep === 5 && (
          <StepM5 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
        )}
      </div>
      <div className="steps-sidebar">
        <h3>Steps to Submit a Request:</h3>
        <ul>
          <li
            onClick={() => setActiveStep(1)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Step 1:
            <span
              style={{
                fontSize: '13px',
                textDecoration: 'underline',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'blue')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              Gather Event Information
            </span>
          </li>
          <li
            onClick={() => setActiveStep(2)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Step 2:
            <span
              style={{
                fontSize: '13px',
                textDecoration: 'underline',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'blue')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              Select Event Location and Dates
            </span>
          </li>
          <li
            onClick={() => setActiveStep(3)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Step 3:
            <span
              style={{
                fontSize: '13px',
                textDecoration: 'underline',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'blue')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              Confirm Event Dates
            </span>
          </li>
          <li
            onClick={() => setActiveStep(4)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Step 4:
            <span
              style={{
                fontSize: '13px',
                textDecoration: 'underline',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'blue')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              Add Additional Items and Submit for District Approval
            </span>
          </li>
          <li
            onClick={() => setActiveStep(5)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {/* Step 5: */}
            <span
              style={{
                fontSize: '13px',
                textDecoration: 'underline',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'blue')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              {/* Review and Finalize */}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Events1;
