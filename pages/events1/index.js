import React, { useState } from 'react';
import StepM1 from '../../components/stepM1';
import StepM2 from '../../components/stepM2';
import StepM3 from '../../components/stepM3';
import StepM4 from '../../components/stepM4';

const Events1 = () => {
  const [activeStep, setActiveStep] = useState(1); // Tracks the active step

  return (
    <div className="events-container">
      <div className="steps-content">
        {activeStep === 1 && <StepM1 setActiveStep={setActiveStep} />}
        {activeStep === 2 && <StepM2 setActiveStep={setActiveStep}/>}
        {activeStep === 3 && <StepM3 setActiveStep={setActiveStep}/>}
        {activeStep === 4 && <StepM4 setActiveStep={setActiveStep}/>}
      </div>
      <div className="steps-sidebar">
        <h3>Steps to Submit a Request:</h3>
        <ul>
          <li onClick={() => setActiveStep(1)}>Step 1: Gather Event Information</li>
          <li onClick={() => setActiveStep(2)}>Step 2: Select Event Location and Dates</li>
          <li onClick={() => setActiveStep(3)}>Step 3: Confirm Event Dates</li>
          <li onClick={() => setActiveStep(4)}>Step 4: Add Additional Items and Submit for District Approval</li>
        </ul>
      </div>
    </div>
  );
};
export default Events1;
