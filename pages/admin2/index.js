import React, { useEffect, useState } from "react";

const BookingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // State for selected booking
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State for overlay visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://hotel-website-backend-eosin.vercel.app/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const flattenedData = data.flatMap((user) =>
    user.booked_details.map((booking) => ({
      ...booking, // Include all details in booking object
    }))
  );

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="table-container">
      <h2>Booking Details</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Event Name</th>
            <th>Room Type</th>
            <th>Booked Dates</th>
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((booking, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => handleBookingClick(booking)}>
                  {booking.booking_id}
                </button>
              </td>
              <td>{booking.event_name}</td>
              <td>{booking.room_type}</td>
              <td>
                {booking.booked_dates.map((date, idx) => (
                  <div key={idx}>
                    <strong>Date:</strong> {date.date}, <strong>Start Time:</strong> {date.startTime}, <strong>End Time:</strong> {date.endTime}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOverlayOpen && selectedBooking && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Booking Details</h3>
            <p><strong>Booking ID:</strong> {selectedBooking.booking_id}</p>
            <p><strong>Event Name:</strong> {selectedBooking.event_name}</p>
            <p><strong>Room Type:</strong> {selectedBooking.room_type}</p>
            <p><strong>Date Option:</strong> {selectedBooking.date_option}</p>
            <p><strong>Attendance:</strong> {selectedBooking.attendance}</p>
            <p><strong>Booked Dates:</strong></p>
            {selectedBooking.booked_dates.map((date, idx) => (
              <div key={idx}>
                <strong>Date:</strong> {date.date}, <strong>Start Time:</strong> {date.startTime}, <strong>End Time:</strong> {date.endTime}
              </div>
            ))}
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
