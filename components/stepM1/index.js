import React, { useEffect, useState } from "react";
import axios from "axios";

const StepM1 = ({ setActiveStep, setFormData, formData }) => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMoreUnpaid, setShowMoreUnpaid] = useState(false);
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [showMorePrevious, setShowMorePrevious] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState("");

  // Date/Time fields (from Step2)
  const [dateRows, setDateRows] = useState(formData.dateRows || []);
  const [dateOption, setDateOption] = useState(formData.dateOption || "");
  const [repeatFrequency, setRepeatFrequency] = useState(
    formData.repeatFrequency || ""
  );
  const [weeklyRepeatDays, setWeeklyRepeatDays] = useState(
    formData.weeklyRepeatDays || {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    }
  );
  const [monthlyRepeatBy, setMonthlyRepeatBy] = useState(
    formData.monthlyRepeatBy || ""
  );
  const [monthlyRepeatFrequency, setMonthlyRepeatFrequency] = useState(
    formData.monthlyRepeatFrequency || "1 month"
  );
  const [repeatOn, setRepeatOn] = useState(formData.repeatOn || "");
  const [repeatDay, setRepeatDay] = useState(formData.repeatDay || "");
  const [firstDate, setFirstDate] = useState(formData.firstDate || "");
  const [endByDate, setEndByDate] = useState(formData.endByDate || "");
  const [startTime, setStartTime] = useState(formData.startTime || "");
  const [endTime, setEndTime] = useState(formData.endTime || "");

  const today = new Date();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1]; // Extract only Base64 part

        setFormData((prev) => ({
          ...prev,
          document_uploaded: base64Image, // Store in state
        }));

        // Call the API after setting the state
        await uploadDocument(base64Image);
      };
    }
  };
  const uploadDocument = async (imageBase64) => {
    try {
      const response = await axios.post(
        "https://hotel-website-backend-eosin.vercel.app/upload-document_non-profit",
        {
          email: formData.email,
          image: imageBase64,
        }
      );

      if (response.data.success) {
        alert("Document uploaded successfully!");
      } else {
        alert(response.data.error || "Failed to upload document.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading document.");
    }
  };
  const filterBookings = (bookings, isUpcoming) => {
    return bookings.filter((booking) =>
      booking.booked_dates.some((date) => {
        const bookedDate = new Date(date.date);
        return isUpcoming ? bookedDate >= today : bookedDate < today;
      })
    );
  };

  // Date/Time handling functions (from Step2)
  const addAdditionalDate = () => {
    setDateRows([...dateRows, { date: "", startTime: "", endTime: "" }]);
  };

  const deleteRow = (index) => {
    const updatedRows = dateRows.filter((_, i) => i !== index);
    setDateRows(updatedRows);
  };

  const handleWeeklyRepeatDayChange = (day) => {
    setWeeklyRepeatDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleDateChange = (index, field, value) => {
    const updatedRows = [...dateRows];
    updatedRows[index][field] = value;

    if (
      updatedRows[index].startTime &&
      updatedRows[index].endTime &&
      updatedRows[index].startTime >= updatedRows[index].endTime
    ) {
      alert("Start time must be earlier than End time.");
      return;
    }

    setDateRows(updatedRows);
  };

  const handleDateOptionChange = (e) => {
    const newDateOption = e.target.value;
    setDateOption(newDateOption);
    setFormData((prev) => ({
      ...prev,
      dateOption: newDateOption,
    }));
    setValidationErrors([]); // Clear validation errors when user selects date option

    if (newDateOption === "One-Time") {
      setRepeatFrequency("");
      setWeeklyRepeatDays({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      });
      setMonthlyRepeatBy("");
      setMonthlyRepeatFrequency("");
    }
  };

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);
    if (endTime && value >= endTime) {
      alert("Start time must be earlier than End time.");
    }
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    setEndTime(value);
    if (startTime && value <= startTime) {
      alert("End time must be later than Start time.");
    }
  };

  // Validation function
  const validateForm = () => {
    const errors = [];

    if (!formData.roomType) errors.push("Please select a room type");
    if (!formData.eventName) errors.push("Please enter an event name");
    if (!formData.attendance)
      errors.push("Please enter anticipated attendance");
    if (!dateOption)
      errors.push("Please select a date option (One-Time or Recurring)");

    if (dateOption === "One-Time") {
      if (dateRows.length === 0) {
        errors.push("Please add at least one date for your event");
      } else {
        const invalidRows = dateRows.filter(
          (row) => !row.date || !row.startTime || !row.endTime
        );
        if (invalidRows.length > 0) {
          errors.push(
            "Please fill in date, start time, and end time for all rows"
          );
        }
      }
    }

    if (dateOption === "Recurring") {
      if (!firstDate) errors.push("Please select the first date");
      if (!startTime) errors.push("Please select a start time");
      if (!endTime) errors.push("Please select an end time");
      if (!repeatFrequency) errors.push("Please select how often to repeat");
      if (!endByDate) errors.push("Please select an end date");

      if (repeatFrequency === "weekly") {
        const anyDaySelected = Object.values(weeklyRepeatDays).some(Boolean);
        if (!anyDaySelected)
          errors.push("Please select at least one day of the week");
      }

      if (repeatFrequency === "monthly" && !monthlyRepeatBy) {
        errors.push(
          "Please select how to repeat monthly (by date or day of week)"
        );
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Format date for backend
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Calculate hours between start and end time
  const calculateHours = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const diffMinutes = endTotalMinutes - startTotalMinutes;
    return Math.ceil(diffMinutes / 60);
  };

  // Generate recurring dates based on pattern
  const generateRecurringDates = () => {
    const dates = [];
    const start = new Date(firstDate);
    const end = new Date(endByDate);

    if (repeatFrequency === "daily") {
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push({
          date: new Date(currentDate),
          startTime: startTime,
          endTime: endTime,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (repeatFrequency === "weekly") {
      const selectedDays = Object.keys(weeklyRepeatDays).filter(
        (day) => weeklyRepeatDays[day]
      );
      const dayNumbers = selectedDays.map((day) => {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return days.indexOf(day);
      });

      let currentDate = new Date(start);
      while (currentDate <= end) {
        if (dayNumbers.includes(currentDate.getDay())) {
          dates.push({
            date: new Date(currentDate),
            startTime: startTime,
            endTime: endTime,
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (repeatFrequency === "monthly") {
      if (monthlyRepeatBy === "dateOfMonth") {
        const dayOfMonth = start.getDate();
        let currentDate = new Date(start);
        while (currentDate <= end) {
          if (currentDate.getDate() === dayOfMonth) {
            dates.push({
              date: new Date(currentDate),
              startTime: startTime,
              endTime: endTime,
            });
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else if (monthlyRepeatBy === "dayOfWeek") {
        const dayOfWeek = start.getDay();
        const weekOfMonth = Math.ceil(start.getDate() / 7);
        let currentDate = new Date(start);
        while (currentDate <= end) {
          if (
            currentDate.getDay() === dayOfWeek &&
            Math.ceil(currentDate.getDate() / 7) === weekOfMonth
          ) {
            dates.push({
              date: new Date(currentDate),
              startTime: startTime,
              endTime: endTime,
            });
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }

    return dates;
  };

  // Handle form submission
  const handleSubmitRequest = async () => {
    // Validate form first
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    const { email, Admin } = userDetails;
    const isAdmin = Admin === true;

    try {
      // Get dates based on option
      let datesToSubmit = [];
      if (dateOption === "One-Time") {
        datesToSubmit = dateRows;
      } else if (dateOption === "Recurring") {
        datesToSubmit = generateRecurringDates();
      }

      // Format dates for submission
      const formattedDateRows = datesToSubmit.map((row) => ({
        ...row,
        date: formatDate(row.date),
      }));

      // Calculate total estimation (simplified - no organization type rate for now)
      const totalHours = formattedDateRows.reduce((total, row) => {
        return total + calculateHours(row.startTime, row.endTime);
      }, 0);

      const estimatedTotal = totalHours * 50 + 200; // $50/hour + $200 security deposit

      const bookingDetails = {
        event_name: formData.eventName,
        eventDescription: null,
        organization_type: null,
        attendance: formData.attendance,
        flexible: formData.flexible || false,
        room_type: formData.roomType,
        date_option: dateOption,
        estimatedTotal: estimatedTotal.toFixed(2),
        additionalItems: [],
        approved: false,
        paid: false,
        booked_dates: formattedDateRows,
      };

      // Submit booking
      const response = await axios.post(
        "https://hotel-website-backend-eosin.vercel.app/checkout",
        { email, booked_details: bookingDetails }
      );

      if (response.status === 200) {
        const bookingId = response.data.booking_id;

        // Only send emails if user is NOT admin
        if (!isAdmin) {
          // Send email to user
          await axios.post(
            "https://hotel-website-backend-eosin.vercel.app/send_email_to_user",
            { email, booking_id: bookingId }
          );

          // Send email to admin
          await axios.post(
            "https://hotel-website-backend-eosin.vercel.app/send_email_to_admin_to_approve",
            { email, booking_id: bookingId }
          );
        }

        // Show success modal
        setSuccessBookingId(bookingId);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert(
        "❌ Error: " +
          (error.response?.data?.error ||
            "Something went wrong. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    if (userDetails) {
      const { email, full_name } = userDetails;

      if (full_name) {
        setFormData((prev) => ({ ...prev, full_name }));
      }
      if (email) {
        setFormData((prev) => ({ ...prev, email }));
      }

      if (email) {
        setLoading(true);
        axios
          .get(
            `https://hotel-website-backend-eosin.vercel.app/booking-details_wrt_email?email=${email}`
          )
          .then((response) => {
            const allBookings = response.data.booked_details;
            console.log("All Bookings:", allBookings);

            const today = new Date();
            const previousBookings = [];
            const upcomingBookings = [];
            const unpaidInvoices = [];

            allBookings.forEach((booking) => {
              const pastDates = booking.booked_dates.filter((date) => {
                const eventDate = new Date(
                  date.date.split("-").reverse().join("-")
                ); // Convert to `YYYY-MM-DD`
                return eventDate < today;
              });

              const futureDates = booking.booked_dates.filter((date) => {
                const eventDate = new Date(
                  date.date.split("-").reverse().join("-")
                ); // Convert to `YYYY-MM-DD`
                return eventDate >= today;
              });

              // Filter for unpaid invoices where paid is false and approved is true
              const unpaid = booking.booked_dates.filter((date) => {
                return booking.paid === false && booking.approved === true;
              });

              if (pastDates.length > 0) {
                previousBookings.push({ ...booking, booked_dates: pastDates });
              }

              if (futureDates.length > 0) {
                upcomingBookings.push({
                  ...booking,
                  booked_dates: futureDates,
                });
              }

              if (unpaid.length > 0) {
                unpaidInvoices.push({ ...booking, booked_dates: unpaid });
              }
            });

            console.log("Filtered Unpaid Invoices:", unpaidInvoices);

            setBookingDetails({
              previous: previousBookings,
              upcoming: upcomingBookings,
              unpaidInvoices,
            });

            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch booking details:", err);
            setError("Failed to fetch booking details.");
            setLoading(false);
          });
      } else {
        console.warn("No email found in userDetails.");
      }
    } else {
      console.warn("userDetails not found in localStorage.");
    }
  }, [setFormData]);

  const renderBookingTable = (bookings, showMore, setShowMore) => {
    // Limit displayed rows to 5 if showMore is false
    const displayedBookings = showMore ? bookings : bookings.slice(0, 5);

    return (
      <>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Event Name</th>
              <th>Room Type</th>
              <th>Date Option</th>
              <th>Attendance</th>
              <th>Booked Date</th>
              <th>Time</th>
              <th>Flexible</th>
            </tr>
          </thead>
          <tbody>
            {displayedBookings.map((booking) => {
              return booking.booked_dates.map((date, index) => (
                <tr key={`${booking.booking_id}-${index}`}>
                  <td>{booking.booking_id}</td>
                  <td>{booking.event_name}</td>
                  <td>{booking.room_type}</td>
                  <td>{booking.date_option}</td>
                  <td>{booking.attendance}</td>
                  <td>{date.date}</td>
                  <td>
                    {date.startTime} - {date.endTime}
                  </td>
                  <td>{booking.flexible ? "Yes" : "No"}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>

        {/* Show the View More button if there are more than 5 rows */}
        {bookings.length > 5 && (
          <a
            href="#"
            className="view-more-btn"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              setShowMore(!showMore); // Toggle the showMore state
            }}
          >
            {showMore ? "Show Less" : "View More"}
          </a>
        )}
      </>
    );
  };

  return (
    <div className="step-m1-container">
      {/* Success Modal */}
      {showSuccessModal &&
        (() => {
          const userDetails = JSON.parse(localStorage.getItem("user_details"));
          const isAdmin = userDetails?.Admin === true;

          return (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "40px",
                  maxWidth: "500px",
                  width: "90%",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "60px",
                    marginBottom: "20px",
                  }}
                >
                  ✅
                </div>
                <h2
                  style={{
                    color: "#4caf50",
                    marginBottom: "15px",
                    fontSize: "24px",
                  }}
                >
                  {isAdmin
                    ? "Booking Created Successfully!"
                    : "Request Submitted Successfully!"}
                </h2>
                <p
                  style={{
                    color: "#666",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                >
                  {isAdmin
                    ? "Your booking has been created."
                    : "Your booking request has been submitted."}
                </p>
                <div
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "8px",
                    margin: "20px 0",
                    border: "2px dashed #4caf50",
                  }}
                >
                  <p
                    style={{
                      margin: "5px 0",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Booking ID:{" "}
                    <span style={{ color: "#4caf50" }}>{successBookingId}</span>
                  </p>
                </div>
                {!isAdmin && (
                  <>
                    <p
                      style={{
                        color: "#666",
                        marginBottom: "10px",
                        fontSize: "14px",
                      }}
                    >
                      📧 Admin has been notified via email
                    </p>
                    <p
                      style={{
                        color: "#666",
                        marginBottom: "25px",
                        fontSize: "14px",
                      }}
                    >
                      ✉️ You will receive an email confirmation shortly
                    </p>
                  </>
                )}
                <button
                  onClick={closeSuccessModal}
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                    marginTop: isAdmin ? "15px" : "0",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#45a049")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#4caf50")
                  }
                >
                  Close
                </button>
              </div>
            </div>
          );
        })()}

      <h2 className="step-title">Submit New Request</h2>

      {/* Validation Errors Display */}
      {validationErrors.length > 0 && (
        <div
          style={{
            backgroundColor: "#ffebee",
            border: "2px solid #f44336",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "20px",
            color: "#c62828",
          }}
        >
          <h4
            style={{
              margin: "0 0 10px 0",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ⚠️ Please complete the following to submit your request:
          </h4>
          <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
            {validationErrors.map((err, idx) => (
              <li key={idx} style={{ marginBottom: "5px" }}>
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="step-content">
        <div className="event-info">
          <h3 className="section-title">Event Information</h3>
          <form className="event-form">
            <div className="form-group">
              <label>Full Name</label>
              <span>{formData.full_name || "N/A"}</span>
            </div>
            <div className="form-group">
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    roomType: e.target.value,
                  }));
                  setValidationErrors([]);
                }}
                required
              >
                <option value="" disabled>
                  Select room type
                </option>
                <option value="Gym">Gym</option>
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    eventName: e.target.value,
                  }));
                  setValidationErrors([]);
                }}
                required
              />
            </div>
            {/* COMMENTED OUT - Event Description field
 <div className="form-group">
 <label>Event Description *</label>
 <input
 type="text"
 name="eventDescription"
 placeholder="Enter event Description"
 value={formData.eventDescription}
 onChange={(e) => setFormData((prev) => ({ ...prev, eventDescription: e.target.value }))}
 required
 />
 </div>
 */}
            {/* COMMENTED OUT - Organization Type field
 <div className="form-group">
 <label>Organization Type*</label>
 <select
 name="organization_type"
 value={formData.organization_type}
 onChange={(e) =>
 setFormData((prev) => ({ ...prev, organization_type: e.target.value }))
 }
 required
 >
 <option value="" disabled>Select Organization type</option>
 <option value="Profit">Profit</option>
 <option value="Non-Profit">Non-Profit</option>
 </select>
</div>

{formData.organization_type === "Non-Profit" && (
 <div className="form-group">
 <label>{formData.document_uploaded ? "Update Document" : "Upload Document"}</label>
 <input type="file" name="document_uploaded" accept="image/*" onChange={handleFileUpload} />

 {formData.document_uploaded && (
 <button
 onClick={() => setPreviewVisible(!previewVisible)}
 style={{
 fontSize:"10px",
 marginTop: "0px",
 padding: "4px 0px",
 backgroundColor: "#007bff",
 color: "#fff",
 border: "none",
 cursor: "pointer",
 }}
 >
 {previewVisible ? "Hide Preview" : "Show Preview"}
 </button>
 )}

 {previewVisible && formData.document_uploaded && (
 <div style={{ marginTop: "10px" }}>
 <img
 src={`data:image/png;base64,${formData.document_uploaded}`}
 alt="Uploaded Document"
 style={{ width: "100px", height: "100px", objectFit: "cover" }}
 />
 </div>
 )}
 </div>
 )}
*/}

            <div className="form-group">
              <label>Flexible?</label>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="radio"
                    name="flexible"
                    value="flexible"
                    checked={formData.flexible === true}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        flexible: true,
                      }))
                    }
                  />
                  <span style={{ fontSize: "14px" }}>My dates are flexible</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="radio"
                    name="flexible"
                    value="fixed"
                    checked={formData.flexible === false}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        flexible: false,
                      }))
                    }
                  />
                  <span style={{ fontSize: "14px" }}>My dates are fixed</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Anticipated Attendance *</label>
              <input
                type="number"
                name="attendance"
                placeholder="Enter attendance"
                value={formData.attendance}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    attendance: e.target.value,
                  }));
                  setValidationErrors([]);
                }}
                required
              />
            </div>

            {/* Date/Time Selection Section (merged from Step2) */}
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "2px solid #e0e0e0",
              }}
            >
              <h3
                className="section-title"
                style={{ marginBottom: "15px", color: "#2c3e50" }}
              >
                📅 Event Dates & Times
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "130px 1fr",
                  gap: "15px",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <label
                  style={{
                    fontWeight: "500",
                    color: "#333",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Date Option *
                </label>
                <select
                  value={dateOption}
                  onChange={handleDateOptionChange}
                  style={{
                    padding: "8px 10px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select date option</option>
                  <option value="One-Time">
                    One-Time Event (specific dates)
                  </option>
                  <option value="Recurring">
                    Recurring Event (repeating pattern)
                  </option>
                </select>
              </div>

              {dateOption === "Recurring" && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    backgroundColor: "#fafbfc",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#2c3e50",
                    }}
                  >
                    Recurring Event Details
                  </h4>

                  {/* First Date */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "130px 1fr",
                      gap: "15px",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <label
                      style={{
                        fontWeight: "500",
                        color: "#333",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      First Date *
                    </label>
                    <input
                      type="date"
                      value={firstDate}
                      onChange={(e) => {
                        setFirstDate(e.target.value);
                        setValidationErrors([]);
                      }}
                      style={{
                        padding: "8px 10px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  {/* Start & End Time */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "130px auto auto",
                      gap: "15px",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <label
                      style={{
                        fontWeight: "500",
                        color: "#333",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Time *
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      placeholder="Start Time"
                      style={{
                        width: "150px",
                        padding: "6px 10px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                      }}
                    />
                    <input
                      type="time"
                      value={endTime}
                      onFocus={() => setEndTime("")}
                      onChange={handleEndTimeChange}
                      placeholder="End Time"
                      style={{
                        width: "150px",
                        padding: "6px 10px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  {/* Repeat */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "130px 1fr",
                      gap: "15px",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <label
                      style={{
                        fontWeight: "500",
                        color: "#333",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Repeat *
                    </label>
                    <select
                      value={repeatFrequency}
                      onChange={(e) => setRepeatFrequency(e.target.value)}
                      style={{
                        padding: "8px 10px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select repeat frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  {repeatFrequency === "daily" && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "130px 1fr",
                        gap: "15px",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <label
                        style={{
                          fontWeight: "500",
                          color: "#333",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        End By *
                      </label>
                      <input
                        type="date"
                        value={endByDate}
                        onChange={(e) => setEndByDate(e.target.value)}
                        style={{
                          padding: "8px 10px",
                          fontSize: "14px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          backgroundColor: "#fff",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  )}

                  {repeatFrequency === "weekly" && (
                    <div>
                      {/* Repeat On Days */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "130px 1fr",
                          gap: "10px",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <label
                          style={{
                            fontWeight: "500",
                            color: "#333",
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Repeat On *
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "12px",
                            alignItems: "center",
                          }}
                        >
                          {Object.keys(weeklyRepeatDays).map((day) => (
                            <label
                              key={day}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: "#333",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={weeklyRepeatDays[day]}
                                onChange={() =>
                                  handleWeeklyRepeatDayChange(day)
                                }
                                style={{ cursor: "pointer", margin: "0" }}
                              />
                              {day}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* End By */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "150px 2fr",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <label
                          style={{
                            fontWeight: "500",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          End By *
                        </label>
                        <input
                          type="date"
                          value={endByDate}
                          onChange={(e) => setEndByDate(e.target.value)}
                          style={{
                            padding: "8px 10px",
                            fontSize: "14px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            backgroundColor: "#fff",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {repeatFrequency === "monthly" && (
                    <div>
                      {/* Repeat By */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "130px 1fr",
                          gap: "15px",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <label
                          style={{
                            fontWeight: "500",
                            color: "#333",
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Repeat By *
                        </label>
                        <select
                          value={monthlyRepeatBy}
                          onChange={(e) => setMonthlyRepeatBy(e.target.value)}
                          style={{
                            padding: "8px 10px",
                            fontSize: "14px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            backgroundColor: "#fff",
                            boxSizing: "border-box",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select repeat method</option>
                          <option value="dateOfMonth">Date of Month</option>
                          <option value="dayOfWeek">Day Of Week</option>
                        </select>
                      </div>

                      {/* Repeat On (for dayOfWeek) */}
                      {monthlyRepeatBy === "dayOfWeek" && (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "130px 1fr 1fr",
                            gap: "15px",
                            alignItems: "center",
                            marginBottom: "15px",
                          }}
                        >
                          <label
                            style={{
                              fontWeight: "500",
                              color: "#333",
                              fontSize: "14px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Repeat On *
                          </label>
                          <select
                            value={repeatOn}
                            onChange={(e) => setRepeatOn(e.target.value)}
                            style={{
                              padding: "8px 10px",
                              fontSize: "14px",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              backgroundColor: "#fff",
                              boxSizing: "border-box",
                              cursor: "pointer",
                            }}
                          >
                            <option>Select week</option>
                            <option>First</option>
                            <option>Second</option>
                            <option>Third</option>
                            <option>Fourth</option>
                          </select>
                          <select
                            value={repeatDay}
                            onChange={(e) => setRepeatDay(e.target.value)}
                            style={{
                              padding: "8px 10px",
                              fontSize: "14px",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              backgroundColor: "#fff",
                              boxSizing: "border-box",
                              cursor: "pointer",
                            }}
                          >
                            <option>Select day</option>
                            <option>Sunday</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                          </select>
                        </div>
                      )}

                      {/* End By */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "150px 1fr",
                          gap: "15px",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <label
                          style={{
                            fontWeight: "500",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          End By *
                        </label>
                        <input
                          type="date"
                          value={endByDate}
                          onChange={(e) => setEndByDate(e.target.value)}
                          style={{
                            padding: "8px 10px",
                            fontSize: "14px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            backgroundColor: "#fff",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {dateOption === "One-Time" && (
                <div style={{ marginTop: "15px" }}>
                  <div className="date-table">
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "#e3f2fd" }}>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #ddd",
                            }}
                          >
                            Date
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #ddd",
                            }}
                          >
                            Start Time
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #ddd",
                            }}
                          >
                            End Time
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #ddd",
                            }}
                          >
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dateRows.map((row, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              <input
                                type="date"
                                value={row.date}
                                onChange={(e) =>
                                  handleDateChange(
                                    index,
                                    "date",
                                    e.target.value
                                  )
                                }
                                style={{
                                  width: "100%",
                                  padding: "5px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              <input
                                type="time"
                                value={row.startTime}
                                onChange={(e) =>
                                  handleDateChange(
                                    index,
                                    "startTime",
                                    e.target.value
                                  )
                                }
                                style={{
                                  width: "100%",
                                  padding: "5px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #ddd",
                              }}
                            >
                              <input
                                type="time"
                                value={row.endTime}
                                onChange={(e) =>
                                  handleDateChange(
                                    index,
                                    "endTime",
                                    e.target.value
                                  )
                                }
                                style={{
                                  width: "100%",
                                  padding: "5px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #ddd",
                                textAlign: "center",
                              }}
                            >
                              <button
                                onClick={() => deleteRow(index)}
                                type="button"
                                style={{
                                  backgroundColor: "#f44336",
                                  color: "white",
                                  border: "none",
                                  padding: "5px 10px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={addAdditionalDate}
                    className="btn-add"
                    type="button"
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    + Add Date
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="btn-continue"
              onClick={handleSubmitRequest}
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? "#ccc" : "",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                margin: "30px auto 0 auto",
                padding: "10px 24px",
                fontSize: "14px",
              }}
            >
              {isSubmitting ? (
                <>
                  <span>
                    {(() => {
                      const userDetails = JSON.parse(
                        localStorage.getItem("user_details")
                      );
                      return userDetails?.Admin
                        ? "Booking..."
                        : "Submitting...";
                    })()}
                  </span>
                  <div
                    style={{
                      border: "3px solid #f3f3f3",
                      borderTop: "3px solid #3498db",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                </>
              ) : (
                (() => {
                  const userDetails = JSON.parse(
                    localStorage.getItem("user_details")
                  );
                  return userDetails?.Admin ? "Book Now" : "Submit Request";
                })()
              )}
            </button>
            <style jsx>{`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </form>
        </div>

        {loading && <p>Loading booking details...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Render Unpaid Invoices */}
        {/* Render Unpaid Invoices */}
        {!loading && bookingDetails.unpaidInvoices?.length > 0 && (
          <div className="booking-details">
            <h3>Unpaid Invoices</h3>
            {renderBookingTable(
              bookingDetails.unpaidInvoices,
              showMoreUnpaid,
              setShowMoreUnpaid
            )}
          </div>
        )}

        {/* Render Upcoming Events */}
        {!loading && bookingDetails.upcoming?.length > 0 && (
          <div className="booking-details">
            <h3>Upcoming Events</h3>
            {renderBookingTable(
              bookingDetails.upcoming,
              showMoreUpcoming,
              setShowMoreUpcoming
            )}
          </div>
        )}

        {!loading && bookingDetails.previous?.length > 0 && (
          <div className="booking-details">
            <h3>Previous Events</h3>
            {renderBookingTable(
              bookingDetails.previous,
              showMorePrevious,
              setShowMorePrevious
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepM1;
