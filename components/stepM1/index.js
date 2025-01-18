import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StepM1 = ({ setActiveStep, setFormData, formData }) => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMoreUnpaid, setShowMoreUnpaid] = useState(false);
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [showMorePrevious, setShowMorePrevious] = useState(false);

  useEffect(() => {
    // Fetch user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    if (userDetails) {
      const { email, full_name } = userDetails;

      // Prefill full_name in formData if available
      if (full_name) {
        setFormData((prev) => ({ ...prev, full_name }));
      }

      if (email) {
        setLoading(true);
        // Fetch booking details from the API using the email
        axios
          .get(`https://hotel-website-backend-eosin.vercel.app/booking-details_wrt_email?email=${email}`)
          .then((response) => {
            setBookingDetails(response.data.booked_details);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Failed to fetch booking details:', err);
            setError('Failed to fetch booking details.');
            setLoading(false);
          });
      } else {
        console.warn('No email found in userDetails.');
      }
    } else {
      console.warn('userDetails not found in localStorage.');
    }
  }, [setFormData]);

  const renderBookingTable = (bookings, showMore, setShowMore) => {
    // Limit records to 5 if not 'showMore'
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
              <th>Status</th> {/* New column for Status */}
              <th>Invoice Status</th> {/* New column for Invoice Status */}
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
                  <td>{booking.status || 'N/A'}</td> {/* Render status or default to 'N/A' */}
                  <td>{booking.invoice_status || 'N/A'}</td> {/* Render invoice status or default to 'N/A' */}
                </tr>
              ));
            })}
          </tbody>
        </table>
  
        {/* Display View More button only if there are more than 5 records */}
        {bookings.length > 5 && (
          <button className="view-more-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'View More'}
          </button>
        )}
      </>
    );
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
              <span>{formData.full_name || 'N/A'}</span>
            </div>
            <div className="form-group">
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={(e) => setFormData((prev) => ({ ...prev, roomType: e.target.value }))}
                required
              >
                <option value="" disabled>Select room type</option>
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
                onChange={(e) => setFormData((prev) => ({ ...prev, eventName: e.target.value }))}
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
                onChange={(e) => setFormData((prev) => ({ ...prev, attendance: e.target.value }))}
                required
              />
            </div>

            <button
              type="button"
              className="btn-continue"
              onClick={() => setActiveStep(2)}
              disabled={!formData.roomType || !formData.eventName || !formData.attendance} // Disable button if form is invalid
            >
              Next
            </button>
          </form>
        </div>

        {loading && <p>Loading booking details...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Render Unpaid Invoices */}
        {!loading && bookingDetails.length > 0 && (
          <div className="booking-details">
            <h3>Unpaid Invoices</h3>
            {renderBookingTable(bookingDetails, showMoreUnpaid, setShowMoreUnpaid)}
          </div>
        )}

        {/* Render Upcoming Events */}
        {!loading && bookingDetails.length > 0 && (
          <div className="booking-details">
            <h3>Upcoming Events</h3>
            {renderBookingTable(bookingDetails, showMoreUpcoming, setShowMoreUpcoming)}
          </div>
        )}

        {/* Render Previous Events */}
        {!loading && bookingDetails.length > 0 && (
          <div className="booking-details">
            <h3>Previous Events</h3>
            {renderBookingTable(bookingDetails, showMorePrevious, setShowMorePrevious)}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepM1;
