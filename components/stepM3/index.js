import React from 'react';
import EventSummary from '../EventSummary';

const StepM3 = ({ setActiveStep, formData }) => {
  
  return (
    <div className="step3-container">
      
      <EventSummary
      setActiveStep={setActiveStep}
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
 
      
    </div>
  );
};

export default StepM3;
