import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import './Admin.scss'; // Include your styles here

const Admin = () => {
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const [value, setValue] = useState(new Date()); // Current selected date
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://hotel-website-backend-eosin.vercel.app/users');
        const users = result.data;

        const booked = {};
        
        users.forEach(user => {
          const checkoutDetails = user.checkout_details;
          if (checkoutDetails) {
            checkoutDetails.forEach((details) => {
              details.forEach(({ checkIn, checkOut, title }) => {
                const startDate = new Date(checkIn);
                const endDate = new Date(checkOut);
                // Loop through the date range and mark as booked
                for (
                  let date = startDate;
                  date <= endDate;
                  date.setDate(date.getDate() + 1)
                ) {
                  const dateString = date.toDateString();
                  if (!booked[dateString]) {
                    booked[dateString] = [];
                  }
                  // Add user's email and full name to the booking details
                  booked[dateString].push({
                    title,
                    checkIn,
                    checkOut,
                    email: user.email,
                    fullName: user.full_name,
                    price: user.price || 'N/A', // Handle cases where price may not be defined
                  });
                }
              });
            });
          }
        });

        setBookedDates(Object.keys(booked));
        setBookingDetails(booked);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (bookedDates.includes(date.toDateString())) {
        return 'booked'; // Apply a class for booked dates
      }
      return 'available'; // Apply a class for available dates
    }
  };

  const handleDayClick = (date) => {
    const dateString = date.toDateString();
    if (bookingDetails[dateString]) {
      setSelectedBooking(bookingDetails[dateString]);
    } else {
      setSelectedBooking(null);
    }
  };

  return (
    <div className="admin">
      <h1>Admin Panel</h1>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
        onClickDay={handleDayClick} // Handle day click
      />
      {selectedBooking && (
        <div className="booking-details">
          <h2>Booking Details</h2>
          <ul>
            {selectedBooking.map((booking, index) => (
              <li key={index}>
                <strong>Room Title:</strong> {booking.title} <br />
                <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleString()} <br />
                <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleString()} <br />
                <strong>Email:</strong> {booking.email} <br />
                <strong>Full Name:</strong> {booking.fullName} <br />
                <strong>Price:</strong> ${booking.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
