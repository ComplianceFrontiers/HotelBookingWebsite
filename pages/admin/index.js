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
  const [view, setView] = useState('month'); // View type: 'month', 'week', 'day'
  const [roomFilter, setRoomFilter] = useState(''); // Filter by room title
  const [roomTitles, setRoomTitles] = useState([]); // List of room titles for filtering

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://hotel-website-backend-eosin.vercel.app/users');
        const users = result.data;

        const booked = {};
        const rooms = new Set(); // To keep track of room titles

        users.forEach(user => {
          const checkoutDetails = user.checkout_details;
          if (checkoutDetails) {
            checkoutDetails.forEach((details) => {
              details.forEach(({ checkIn, checkOut, title }) => {
                const startDate = new Date(checkIn);
                const endDate = new Date(checkOut);
                rooms.add(title); // Add room title to the set
                
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
        setRoomTitles([...rooms]); // Convert set to array for dropdown
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month' || view === 'week' || view === 'year') {
      const dateString = date.toDateString();
      if (bookedDates.includes(dateString)) {
        // Apply a class for booked dates, with room filter applied if necessary
        if (roomFilter) {
          const bookingForDay = bookingDetails[dateString]?.some(
            (booking) => booking.title === roomFilter
          );
          return bookingForDay ? 'booked' : 'available';
        }
        return 'booked'; // No filter, show all booked dates
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

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleFilterChange = (event) => {
    setRoomFilter(event.target.value);
  };

  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="admin">
      <h1>Admin Panel</h1>
      <div className="admin-container">
        {/* Left-Side Filter by Room Title */}
        <div className="filter-section">
          <h2>Filter by Room Title</h2>
          <select value={roomFilter} onChange={handleFilterChange}>
            <option value="">All Rooms</option>
            {roomTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Right-Side Calendar */}
        <div className="calendar-section">
          {/* View Change Buttons */}
          <div className="view-options">
            <button onClick={() => handleViewChange('month')} className={view === 'month' ? 'active' : ''}>Month</button>
            <button onClick={() => handleViewChange('week')} className={view === 'week' ? 'active' : ''}>Week</button>
            <button onClick={() => handleViewChange('year')} className={view === 'year' ? 'active' : ''}>Year</button>
          </div>

          <Calendar
  onChange={setValue}
  value={value}
  view={view} // Set the current view (month, week, day)
  tileClassName={tileClassName}
  onClickDay={handleDayClick} // Handle day click
  className="custom-calendar" // Apply the custom class here
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
      </div>
    </div>
  );
};

export default Admin;
