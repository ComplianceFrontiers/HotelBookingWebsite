import React from 'react';
import EventSummary from '../EventSummary';

const StepM3 = ({ setActiveStep, formData }) => {
  console.log("Stepm33", formData);
  
  return (
    <div className="step-m3-container">
      <EventSummary
        formData={formData}
        dateOption={formData.dateOption}
        repeatFrequency={formData.repeatFrequency}
        weeklyRepeatDays={formData.weeklyRepeatDays}
        monthlyRepeatBy={formData.monthlyRepeatBy}
        monthlyRepeatFrequency={formData.monthlyRepeatFrequency}
        dateRows={formData.dateRows}
        firstDate={formData.firstDate}
        endByDate={formData.endByDate}
        startTime={formData.startTime}
        endTime={formData.endTime}
        repeatOn={formData.repeatOn}
        repeatDay={formData.repeatDay}
      />

      <div className="navigation-buttons">
        <button onClick={() => setActiveStep(2)} className="btn-back">Back</button>
        <button onClick={() => setActiveStep(4)} className="btn-continue">Continue</button>
      </div>
    </div>
  );
};

export default StepM3;
