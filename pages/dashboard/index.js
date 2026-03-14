import React, { useState, useEffect, Fragment } from "react";
import StepM1 from "../../components/stepM1";
import StepM2 from "../../components/stepM2";
import StepM3 from "../../components/stepM3";
import StepM4 from "../../components/stepM4";
import StepM5 from "../../components/stepM5"; // Import StepM5 component
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Adminstep2 from "../../components/Adminstep2";
import Adminstep3 from "../../components/Adminstep3";
import Adminstep4 from "../../components/Adminstep4";

const Events1 = () => {
  const [activeStep, setActiveStep] = useState(1); // Tracks the active step
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    roomType: "",
    eventName: "",
    eventDescription: null, // Set to null (commented field)
    organization_type: null, // Set to null (commented field)
    attendance: "",
    flexible: false, // New flexible checkbox field
    dateOption: "",
    repeatFrequency: "",
    weeklyRepeatDays: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
    Admin: false,
    document_uploaded: "",
    monthlyRepeatBy: "",
    monthlyRepeatFrequency: "",
    dateRows: [],
    recurringDates: [],
    firstDate: "",
    endByDate: "",
    startTime: "",
    endTime: "",
    repeatOn: "",
    repeatDay: "",
  });
  const [AdmincurrentStep, setAdminCurrentStep] = useState(1);
  const [formData1, setFormData1] = useState({
    full_name: "",
    roomType: "",
    reason: "",
    dateOption: "",
    Admin: false,
    document_uploaded: "",
    repeatFrequency: "",
    weeklyRepeatDays: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
    monthlyRepeatBy: "",
    monthlyRepeatFrequency: "",
    dateRows: [],
    recurringDates: [],
    firstDate: "",
    endByDate: "",
    startTime: "",
    endTime: "",
    repeatOn: "",
    repeatDay: "",
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));

    if (userDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        full_name: userDetails.full_name,
        Admin: userDetails?.Admin ? true : false, // Set Admin if Admin field exists
        document_uploaded: userDetails.document_uploaded,
      }));

      setFormData1((prevFormData) => ({
        ...prevFormData,
        full_name: userDetails.full_name,
        Admin: userDetails?.Admin ? true : false,
        document_uploaded: userDetails.document_uploaded,
      }));
    }
  }, []);
  console.log("document_uploaded", formData.document_uploaded);
  const isAdmin = formData.Admin;

  return (
    <Fragment>
      <Navbar hclass={"wpo-header-style-3"} />
      <div className="events-container">
        <div className="steps-content">
          {/* Admin and Regular Users now use the SAME single-page form */}
          {activeStep === 1 && (
            <StepM1
              setActiveStep={setActiveStep}
              setFormData={setFormData}
              formData={formData}
            />
          )}

          {/* COMMENTED OUT - Old Admin Steps (now admins use same form as users)
 {isAdmin && AdmincurrentStep === 1 && (
 <Adminstep2 setAdminCurrentStep={setAdminCurrentStep} setFormData={setFormData1} formData={formData1} />
 )}
 {isAdmin && AdmincurrentStep === 2 && <Adminstep3 setAdminCurrentStep={setAdminCurrentStep} formData={formData1} />}
 {isAdmin && AdmincurrentStep === 3 && <Adminstep4 setAdminCurrentStep={setAdminCurrentStep} formData={formData1} />}
 */}

          {/* COMMENTED OUT - Step 2 is now merged with Step 1
 {activeStep === 2 && (
 <StepM2 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
 )}
 */}
          {/* COMMENTED OUT - Step 3
 {activeStep === 3 && (
 <StepM3 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
 )}
 */}
          {/* COMMENTED OUT - Step 4
 {activeStep === 4 && (
 <StepM4 setActiveStep={setActiveStep} setFormData={setFormData} formData={formData} />
 )}
 */}
          {activeStep === 5 && (
            <StepM5
              setActiveStep={setActiveStep}
              setFormData={setFormData}
              formData={formData}
            />
          )}
        </div>
        <div className="steps-sidebar">
          <h3>{isAdmin ? "📋 Admin Booking" : "Submit a Request"}:</h3>
          {isAdmin && (
            <div
              style={{
                backgroundColor: "#e3f2fd",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                fontSize: "13px",
                color: "#1976d2",
              }}
            >
              💡 <strong>Admin Note:</strong> Use this form to block dates for
              maintenance or admin events. Bookings will be added to the system.
            </div>
          )}
          <ul>
            <li
              onClick={() => setActiveStep(1)}
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                cursor: "pointer",
                color: "black",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                }}
                onMouseEnter={(e) => (e.target.style.color = "blue")}
                onMouseLeave={(e) => (e.target.style.color = "black")}
              >
                Complete Event Information & Dates
              </span>
            </li>
            {/* COMMENTED OUT - Old step navigation
 <li>Step 2: Event Dates (merged with Step 1)</li>
 <li>Step 3: Confirm Event Dates (commented out)</li>
 <li>Step 4: Additional Services (commented out)</li>
 */}
          </ul>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Events1;
