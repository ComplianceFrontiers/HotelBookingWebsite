import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Admin = () => {
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const [value, setValue] = useState(new Date()); // Current selected date
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [view, setView] = useState('month');
  const [roomFilter, setRoomFilter] = useState('');
  const [roomTitles, setRoomTitles] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]); // To hold dates based on the filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://hotel-website-backend-eosin.vercel.app/users');
        const users = result.data;

        const booked = {};
        const rooms = new Set();

        users.forEach(user => {
          const checkoutDetails = user.checkout_details;
          if (checkoutDetails) {
            checkoutDetails.forEach((details) => {
              details.forEach(({ checkIn, checkOut, title }) => {
                const startDate = new Date(checkIn);
                const endDate = new Date(checkOut);
                rooms.add(title);

                for (
                  let date = startDate;
                  date <= endDate;
                  date.setDate(date.getDate() + 1)
                ) {
                  const dateString = date.toDateString();
                  if (!booked[dateString]) {
                    booked[dateString] = [];
                  }
                  booked[dateString].push({
                    title,
                    checkIn,
                    checkOut,
                    email: user.email,
                    fullName: user.full_name,
                    price: user.price || 'N/A',
                  });
                }
              });
            });
          }
        });

        setBookedDates(Object.keys(booked));
        setBookingDetails(booked);
        setRoomTitles([...rooms]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month' || view === 'week' || view === 'year') {
      const dateString = date.toDateString();
      // Check if the date is booked
      if (filteredDates.includes(dateString)) {
        return 'booked';
      }
      return 'available';
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

  const applyFilter = () => {
    if (roomFilter) {
      const newFilteredDates = bookedDates.filter(dateString => 
        bookingDetails[dateString]?.some(booking => booking.title === roomFilter)
      );
      setFilteredDates(newFilteredDates);
    } else {
      setFilteredDates(bookedDates); // Reset to all booked dates if no filter is applied
    }
  };

  const tileContent = ({ date, view }) => {
    const dateString = date.toDateString();
    if (filteredDates.includes(dateString)) {
      const bookings = bookingDetails[dateString];
      return (
        <div className="tile-content">
          {bookings.map((booking, index) => (
            <div key={index} className="room-title">
              {booking.title}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
};
  return (
    <div className="admin">
      {/* <h1>Admin Panel</h1> */}
      <div className="admin-container">

        <div className="filter-section">
          <div className='filter-data'>
          <h2 className="heading">Filter by Room Title</h2>
          {roomTitles.length > 0 ? (
            roomTitles.map((title, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={title}
                    checked={roomFilter === title}
                    onChange={handleFilterChange}
                  />
                  {title}
                </label>
              </div>
            ))
          ) : (
            <p>No rooms available.</p>
          )}
          <button onClick={applyFilter}>Show availability</button> {/* Filter button */}
          {/* <div>
            <button onClick={() => {
              setRoomFilter('');
              setFilteredDates(bookedDates); // Clear filter and show all dates
            }}>Clear Filter</button>
          </div> */}
          </div>

          <div className="questions">
                    <h2 className="heading">How we can  <br /> Help You!</h2>
                    <p>Need more information or assistance with booking? Don’t hesitate to reach out. Our friendly team is ready to answer any questions and guide you through the reservation process to ensure your experience is seamless and enjoyable.</p>
                    <button class="contact-button" href="/contact" onClick={ClickHandler}>
                      Contact Us
                    </button>
          </div>
        </div>

        

        <div className="calendar-section">
          <Calendar
            onChange={setValue}
            value={value}
            view={view}
            tileClassName={tileClassName}
            tileContent={tileContent}
            onClickDay={handleDayClick}
            className="custom-calendar"
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
