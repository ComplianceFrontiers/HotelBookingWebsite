import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [month, setMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://hotel-website-backend-eosin.vercel.app/users');
        setBookings(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBookingsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];

    const bookingsForDate = bookings
      .flatMap(user => user.checkout_details)
      .flat()
      .filter(booking => {
        if (!booking || !booking.checkIn || !booking.checkOut) {
          return false;
        }

        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);
        return checkInDate <= date && checkOutDate >= date;
      });

    return bookingsForDate;
  };

  const handleDateClick = (date) => {
    const bookingsForDate = getBookingsForDate(date);
    if (bookingsForDate.length > 0) {
      setSelectedDate(date);
      setUserDetails(bookingsForDate);
    } else {
      setUserDetails(null);
    }
  };

  const fetchUserDetails = async (title, checkIn) => {
    try {
      const response = await axios.get(`https://hotel-website-backend-eosin.vercel.app/checkout/filter`, {
        params: { title, checkIn }
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

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

  // Handle month change
  const handleMonthChange = (e) => {
    const newMonth = new Date(month.setMonth(e.target.value));
    setMonth(newMonth);
  };

  // Handle year change
  const handleYearChange = (e) => {
    const newYear = new Date(month.setFullYear(e.target.value));
    setMonth(newYear);
  };

  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="calendar-container">
      <h2>Booking Calendar</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
  <label style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
    Month:
    <select value={month.getMonth()} onChange={handleMonthChange} style={{ padding: '5px', fontSize: '15px', borderRadius : '5px' }}>
      {months.map((monthName, index) => (
        <option key={index} value={index}>
          {monthName}
        </option>
      ))}
    </select>
  </label>
  <label style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
    Year:
    <select value={month.getFullYear()} onChange={handleYearChange} style={{ padding: '5px', fontSize: '15px' , borderRadius : '5px' }}>
      {years.map(year => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </label>
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
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => fetchUserDetails(booking.title, booking.checkIn)}
              >
                <strong>Room:</strong> {booking.title}
              </p>
              <p
                style={{ cursor: 'pointer', color: 'blue' }}
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
