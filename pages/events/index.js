import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from '../../components/Navbar';
import Book from '/public/images/events/book.png';
import Book1 from '/public/images/events/book1.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

const Events = () => {
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
            checkoutDetails.forEach(details => {
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

        const roomArray = [...rooms];
        setBookedDates(Object.keys(booked));
        setBookingDetails(booked);
        setRoomTitles(roomArray);
        setRoomFilter(roomArray[0] || ''); // Set first room title as default filter
        setFilteredDates(Object.keys(booked));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month' || view === 'week' || view === 'year') {
      const dateString = date.toDateString();
      return filteredDates.includes(dateString) ? 'booked' : 'available';
    }
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
      setFilteredDates(bookedDates);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [bookedDates, roomFilter]);

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

  const handleBookingRedirect = () => {
    window.location.href = '/search-result';
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  const SubmitHandler = (e) =>{
    e.preventDefault()
 }
 const [startDate,  setStartDate] = useState(new Date());
    const [startDates,  setStartDates] = useState(new Date());
  return (
    <Fragment>
      <Navbar hclass={'wpo-header-style-3'} />
      <div className="admin">
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
              <button onClick={applyFilter}>Show availability</button>
              <div style={{  marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: 'red', display: 'inline-block', marginRight: '8px' }}></span>
                  <span>Facility Booked</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: 'white', border: '1px solid black', display: 'inline-block', marginRight: '8px' }}></span>
                  <span>Facility Available</span>
                </div>
              </div>
            </div>
            <div className="questions">
              <h2 className="heading">How we can <br /> Help You!</h2>
              <p>Need more information or assistance with booking? Don’t hesitate to reach out. Our friendly team is ready to answer any questions and guide you through the reservation process to ensure your experience is seamless and enjoyable.</p>
              <button className="contact-button" href="/contact" onClick={ClickHandler}>
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
            <button onClick={handleBookingRedirect} className="booking-button">
              Go for Booking
            </button>
            <div className="wpo-select-area">
                                <form onSubmit={SubmitHandler} className="clearfix">
                                    <div className="select-sub">
                                        <span><i className="fi flaticon-calendar"></i>Rental date</span>
                                        <div className="form-group">
                                            <div id="filterDate">
                                                <div className="input-group date" data-date-format="dd.mm.yyyy">
                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                                    <div className="input-group-addon">
                                                        <span className="ti-angle-down"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="select-sub">
                                        <span><i className="fi flaticon-calendar"></i>Check - out</span>
                                        <div className="form-group">
                                            <div id="filterDate2">
                                                <div className="input-group date" data-date-format="dd.mm.yyyy">
                                                    <DatePicker selected={startDates} onChange={(date) => setStartDates(date)} />
                                                    <div className="input-group-addon">
                                                        <span className="ti-angle-down"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="select-sub">
                                        <span> <i className="fi flaticon-user"></i> Guests</span>
                                        <select className="select wide">
                                            <option>25-50</option>
                                            <option>50-75</option>
                                            <option>75-100</option>
                                            <option>100+</option>
                                        </select>
                                    </div>
                                    {/* <div className="select-sub">
                                        <span> <i className="fi flaticon-user"></i> CHILDREN</span>
                                        <select className="select wide">
                                            <option>01</option>
                                            <option>02</option>
                                            <option>03</option>
                                            <option>04</option>
                                            <option>05</option>
                                            <option>06</option>
                                        </select>
                                    </div> */}
                                    <div className="select-sub">
                                        <Link href='/events' className="theme-btn-s2" type="submit">Check Availability</Link>
                                    </div>
                                </form>
                            </div>
            <div className="image-section">
              <img src='/images/events/book.png' alt="Book 2" className="calendar-image" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
