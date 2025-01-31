import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admintable = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Retrieve user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    
    if (userDetails) {
      const { email } = userDetails;
      
      // Call the API to fetch bookings based on the email
      axios.get(`https://hotel-website-backend-eosin.vercel.app/booking-details_wrt_email?email=${email}`)
        .then((response) => {
          const allBookings = response.data.booked_details;
          console.log("All Bookings:", allBookings);
          setBookings(allBookings);  // Set the bookings in the state
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, []);

  // Function to handle delete with confirmation
  const handleDelete = (bookingId) => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    const { email } = userDetails;

    // Show a confirmation message
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");

    if (confirmDelete) {
      // Make an API call to delete the booking if confirmed
      axios.post('https://hotel-website-backend-eosin.vercel.app/delete_booking_admin', {
        email: email,
        booking_id: bookingId
      })
        .then((response) => {
          if (response.data.success) {
            // If deletion is successful, filter the booking out of the state
            const updatedBookings = bookings.filter(booking => booking.booking_id !== bookingId);
            setBookings(updatedBookings);
            console.log('Booking deleted successfully');
          } else {
            console.log('Error deleting booking:', response.data.error);
          }
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        });
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <div className="booking-details">
      <h1>Admin Table</h1>
      <div>
        {bookings.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Room Type</th>
                <th>Admin Name</th>
                <th>Reason</th> 
                <th>Date Option</th>
                <th>Booked Dates</th> 
                <th>Actions</th> {/* New Actions column */}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.booking_id}</td>
                  <td>{booking.room_type}</td>
                  <td>{booking.admin_name}</td>
                  <td>{booking.reason}</td>
                  <td>{booking.date_option}</td>
                  <td>
                    {booking.booked_dates.map((date, idx) => (
                      <div key={idx}>
                        {date.date} - {date.startTime} to {date.endTime}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(booking.booking_id)} 
                      style={{ color: 'red' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings available</p>
        )}
      </div>
    </div>
  );
};

export default Admintable;
