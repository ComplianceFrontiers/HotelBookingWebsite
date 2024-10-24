import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Calendar.module.scss'; // Importing SCSS file for styling

const Calendar = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [month, setMonth] = useState(new Date());
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://hotel-website-backend-eosin.vercel.app/users');
        setBookings(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchData();
  }, []);

  const getBookingsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD

    const bookingsForDate = bookings
      .flatMap(user => user.checkout_details)
      .flat()
      .filter(booking => {
        if (!booking || !booking.checkIn || !booking.checkOut) {
          return false; // Skip if checkIn or checkOut is missing
        }

        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);
        
        // Check if the date is within the booking range
        return checkInDate <= date && checkOutDate >= date;
      });

    return bookingsForDate;
  };

  // Function to handle date click
  const handleDateClick = (date) => {
    const bookingsForDate = getBookingsForDate(date);
    if (bookingsForDate.length > 0) {
      setSelectedDate(date);
      setUserDetails(bookingsForDate);
    } else {
      setUserDetails(null);
    }
  };

  // Function to fetch user details from API based on title and checkIn
  const fetchUserDetails = async (title, checkIn) => {
    try {
      const response = await axios.get(`https://hotel-website-backend-eosin.vercel.app/checkout/filter`, {
        params: { title, checkIn }
      });
      console.log(response.data)
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Generate the calendar days
  const generateCalendarDays = () => {
    const days = [];
    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      const hasCheckIn = getBookingsForDate(date).length > 0;
      days.push(
        <div
          key={i}
          className={`calendar-day ${hasCheckIn ? 'booked' : 'available'}`}
          onClick={() => hasCheckIn && handleDateClick(date)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (increment) => {
    const newMonth = new Date(month.setMonth(month.getMonth() + increment));
    setMonth(newMonth);
  };

  const changeYear = (increment) => {
    const newYear = new Date(month.setFullYear(month.getFullYear() + increment));
    setMonth(newYear);
  };

  return (
    <div className="calendar-container">
      <h2>Booking Calendar</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => changeYear(-1)}>Previous Year</button>
        <button onClick={() => changeMonth(-1)}>Previous Month</button>
        <span>{month.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => changeMonth(1)}>Next Month</button>
        <button onClick={() => changeYear(1)}>Next Year</button>
      </div>
      <div className="calendar">
        {loading ? <p>Loading...</p> : generateCalendarDays()}
      </div>

      {userDetails && (
        <div className="booking-modal">
          <h3>Bookings for {selectedDate.toDateString()}</h3>
          {userDetails.map((booking, index) => (
            <div key={index} className="booking-detail">
              <p
                style={{ cursor: 'pointer', color: 'blue' }} // Add styles to indicate it's clickable
                onClick={() => fetchUserDetails(booking.title, booking.checkIn)}
              >
                <strong>Room:</strong> {booking.title}
              </p>
              <p
                style={{ cursor: 'pointer', color: 'blue' }} // Add styles to indicate it's clickable
                onClick={() => fetchUserDetails(booking.title, booking.checkIn)}
              >
                <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleString()}
              </p>
              <p><strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleString()}</p>
              <hr />
            </div>
          ))}
          <button onClick={() => setUserDetails(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
