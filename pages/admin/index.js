import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Admin = () => {
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const [value, setValue] = useState(new Date()); // Current selected date
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://hotel-website-backend-eosin.vercel.app/users');
        const checkoutDetails = result.data[0].checkout_details;

        const booked = {};
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
              booked[dateString].push({ title, checkIn, checkOut });
            }
          });
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
                <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
