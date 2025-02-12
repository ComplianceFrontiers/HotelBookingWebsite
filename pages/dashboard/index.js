import React, { useState, useEffect, Fragment } from 'react';
import StepM1 from '../../components/stepM1';
import StepM2 from '../../components/stepM2';
import StepM3 from '../../components/stepM3';
import StepM4 from '../../components/stepM4';
import StepM5 from '../../components/stepM5'; // Import StepM5 component
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import Adminstep2 from '../../components/Adminstep2';
import Adminstep3 from '../../components/Adminstep3';
import Adminstep4 from '../../components/Adminstep4';

const Events1 = () => {
  const [activeStep, setActiveStep] = useState(1); // Tracks the active step
  const [formData, setFormData] = useState({
    email:'',
    full_name: '',
    roomType: '',
    eventName: '',
    eventDescription: '',
    organization_type:'',
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
    Admin:false,
    document_uploaded:'',
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
  const [AdmincurrentStep, setAdminCurrentStep] = useState(1); 
  const [formData1, setFormData1] = useState({
    full_name: '',
    roomType: '', 
    reason:'',
    dateOption: '',
    Admin:false,
    document_uploaded:'',
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

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
  
    if (userDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        full_name: userDetails.full_name,
        Admin: userDetails?.Admin ? true : false, // Set Admin if Admin field exists
        document_uploaded:userDetails.document_uploaded,
      }));
  
      setFormData1((prevFormData) => ({
        ...prevFormData,
        full_name: userDetails.full_name,
        Admin: userDetails?.Admin ? true : false,
        document_uploaded:userDetails.document_uploaded,
      }));
    }
  }, []);
  console.log("document_uploaded",formData.document_uploaded)
  const isAdmin = formData.Admin;
  
  return (
    <Fragment>
      <Navbar hclass={'wpo-header-style-3'} />
      <div className="events-container">
        <div className="steps-content">
          {/* Show only StepM2 and StepM3 for Admin */}
          {isAdmin ? (
            <>
               
               {AdmincurrentStep === 1 && (
                <Adminstep2  setAdminCurrentStep={setAdminCurrentStep}  setFormData={setFormData1} formData={formData1} />
              )}
              {AdmincurrentStep === 2 && <Adminstep3 setAdminCurrentStep={setAdminCurrentStep}  formData={formData1} />}
              {AdmincurrentStep === 3 && <Adminstep4 setAdminCurrentStep={setAdminCurrentStep}  formData={formData1} />}

            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        {!isAdmin && (
  <div className="steps-sidebar">
    <h3>Steps to Submit a Request:</h3>
    <ul>
      {/* Admin sees only Steps 2 and 3 */}
      {isAdmin ? (
        <>
          <li
            onClick={() => setActiveStep(2)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: activeStep >= 2 ? 'pointer' : 'not-allowed',
              color: activeStep >= 2 ? 'black' : 'gray',
            }}
          >
            <span style={{ fontSize: '13px' }}>Step 2: Event Dates</span>
          </li>
          <li
            onClick={() => setActiveStep(3)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: activeStep >= 3 ? 'pointer' : 'not-allowed',
              color: activeStep >= 3 ? 'black' : 'gray',
            }}
          >
            <span style={{ fontSize: '13px' }}>Step 3: Confirm Event Dates</span>
          </li>
        </>
      ) : (
        <>
          <li
            onClick={() => setActiveStep(1)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: activeStep === 1 || activeStep > 1 ? 'pointer' : 'not-allowed',
              color: activeStep === 1 || activeStep > 1 ? 'black' : 'gray',
              pointerEvents: activeStep === 1 || activeStep > 1 ? 'auto' : 'none', // Allow click only for current and previous steps
            }}
          >
     
      <span
        style={{
          fontSize: '13px',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'blue')}
        onMouseLeave={(e) => (e.target.style.color = 'black')}
      >
       Step 1: Event Information
      </span>
          </li>
          <li
            onClick={() => setActiveStep(2)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: activeStep >= 2 ? 'pointer' : 'not-allowed',
              color: activeStep >= 2 ? 'black' : 'gray',
        pointerEvents: activeStep >= 2 ? 'auto' : 'none', // Allow click only for current and previous steps
            }}
          >
     
      <span
        style={{
          fontSize: '13px',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'blue')}
        onMouseLeave={(e) => (e.target.style.color = 'black')}
      >
        Step 2: Event Dates
      </span>
          </li>
          <li
            onClick={() => setActiveStep(3)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: activeStep >= 3 ? 'pointer' : 'not-allowed',
              color: activeStep >= 3 ? 'black' : 'gray',
        pointerEvents: activeStep >= 3 ? 'auto' : 'none', // Allow click only for current and previous steps
            }}
          >
   
      <span
        style={{
          fontSize: '13px',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'blue')}
        onMouseLeave={(e) => (e.target.style.color = 'black')}
      >
         Step 3:  Confirm Event Dates
      </span>
          </li>
          <li
            onClick={() => setActiveStep(4)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: activeStep >= 4 ? 'pointer' : 'not-allowed',
              color: activeStep >= 4 ? 'black' : 'gray',
        pointerEvents: activeStep >= 4 ? 'auto' : 'none', // Allow click only for current and previous steps
            }}
          >
      
      <span
        style={{
          fontSize: '13px',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'blue')}
        onMouseLeave={(e) => (e.target.style.color = 'black')}
      >
      Step 4:  Additional Services
      </span>
          </li>
          <li
            onClick={() => setActiveStep(5)}
            style={{
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: activeStep >= 5 ? 'pointer' : 'not-allowed',
              color: activeStep >= 5 ? 'black' : 'gray',
        pointerEvents: activeStep >= 5 ? 'auto' : 'none', // Allow click only for current and previous steps
            }}
          >
      {/* Step 5: */}
      <span
        style={{
          fontSize: '13px',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'blue')}
        onMouseLeave={(e) => (e.target.style.color = 'black')}
      >
        {/* Review and Finalize */}
      </span>
          </li>
        </>
      )}
    </ul>
  </div>
)}

      </div>
      <Footer />
    </Fragment>
  );
};

export default Events1;
