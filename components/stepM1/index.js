import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StepM1 = ({ setActiveStep, setFormData, formData }) => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMoreUnpaid, setShowMoreUnpaid] = useState(false);
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [showMorePrevious, setShowMorePrevious] = useState(false);

  const today = new Date();

  const filterBookings = (bookings, isUpcoming) => {
    return bookings.filter((booking) =>
      booking.booked_dates.some((date) => {
        const bookedDate = new Date(date.date);
        return isUpcoming ? bookedDate >= today : bookedDate < today;
      })
    );
  };
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    if (userDetails) {
      const { email, full_name } = userDetails;
  
      if (full_name) {
        setFormData((prev) => ({ ...prev, full_name }));
      }
  
      if (email) {
        setLoading(true);
        axios
          .get(`https://hotel-website-backend-eosin.vercel.app/booking-details_wrt_email?email=${email}`)
          .then((response) => {
            const allBookings = response.data.booked_details;
            console.log("All Bookings:", allBookings);
  
            const today = new Date();
            const previousBookings = [];
            const upcomingBookings = [];
            const unpaidInvoices = [];
  
            allBookings.forEach((booking) => {
              const pastDates = booking.booked_dates.filter((date) => {
                const eventDate = new Date(date.date.split('-').reverse().join('-')); // Convert to `YYYY-MM-DD`
                return eventDate < today;
              });
  
              const futureDates = booking.booked_dates.filter((date) => {
                const eventDate = new Date(date.date.split('-').reverse().join('-')); // Convert to `YYYY-MM-DD`
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
                upcomingBookings.push({ ...booking, booked_dates: futureDates });
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
              <th>Status</th>
              <th>Invoice Status</th>
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
                  <td>{booking.approved ? 'Request Approved' : 'Request Pending'}</td>
                  <td>{booking.paid ? 'Invoice Paid' : 'Invoice Pending'}</td>
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
    {showMore ? 'Show Less' : 'View More'}
  </a>
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
       {/* Render Unpaid Invoices */}
{!loading && bookingDetails.unpaidInvoices?.length > 0 && (
  <div className="booking-details">
    <h3>Unpaid Invoices</h3>
    {renderBookingTable(bookingDetails.unpaidInvoices, showMoreUnpaid, setShowMoreUnpaid)}
  </div>
)}


        {/* Render Upcoming Events */}
        {!loading && bookingDetails.upcoming?.length > 0 && (
  <div className="booking-details">
    <h3>Upcoming Events</h3>
    {renderBookingTable(bookingDetails.upcoming, showMoreUpcoming, setShowMoreUpcoming)}
  </div>
)}

        {!loading && bookingDetails.previous?.length > 0 && (
  <div className="booking-details">
    <h3>Previous Events</h3>
    {renderBookingTable(bookingDetails.previous, showMorePrevious, setShowMorePrevious)}
  </div>
)}


      </div>
    </div>
  );
};

export default StepM1;
