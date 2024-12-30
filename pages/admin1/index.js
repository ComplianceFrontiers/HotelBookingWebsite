import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../store/actions/action";

const Admin = () => {
  const dispatch = useDispatch();
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const [value, setValue] = useState(new Date()); // Current selected date
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [view, setView] = useState('month');
  const [roomFilter, setRoomFilter] = useState('');
  const [roomTitles, setRoomTitles] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]); // To hold dates based on the filter
  const [selectedSlots, setSelectedSlots] = useState([]); // Track selected slots

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

                // Loop over the days between check-in and check-out dates
                for (
                  let date = new Date(startDate);
                  date <= endDate;
                  date.setDate(date.getDate() + 1)
                ) {
                  const dateString = date.toDateString();
                  if (!booked[dateString]) {
                    booked[dateString] = {};
                  }

                  // Calculate the time slot in 1-hour intervals for each date
                  const timeSlot = `${startDate.getHours()}:00 - ${endDate.getHours()}:00`;
                  if (!booked[dateString][timeSlot]) {
                    booked[dateString][timeSlot] = [];
                  }

                  booked[dateString][timeSlot].push({
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
        setFilteredDates(Object.keys(booked));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      if (filteredDates.includes(dateString)) {
        return 'booked'; // Apply booked class to the entire day
      }
      return 'available';
    }
  };

  const applyFilter = () => {
    if (roomFilter) {
      const filtered = bookedDates.filter((dateString) => {
        const bookingsForDate = bookingDetails[dateString];
        return Object.values(bookingsForDate).some(slot =>
          slot.some(booking => booking.title === roomFilter)
        );
      });

      setFilteredDates(filtered); // Set the filtered dates
    } else {
      setFilteredDates(bookedDates);
    }
  };

  const handleDayClick = (date) => {
    const dateString = date.toDateString();
    console.log("Clicked Date:", dateString); // Log the clicked date
  
    if (bookingDetails[dateString]) {
      setSelectedBooking({
        bookedSlots: bookingDetails[dateString],
        availableSlots: calculateAvailableSlots(dateString),
      });
    } else {
      setSelectedBooking({
        bookedSlots: {},
        availableSlots: calculateAvailableSlots(dateString),
      });
    }
  
    setSelectedSlots([]); // Reset selected slots on date change
    console.log("Updated Selected Booking:", selectedBooking); // Log the selected booking state
  };

  const handleSlotClick = (slot) => {
    setSelectedSlots(prevState => {
      if (prevState.includes(slot)) {
        return prevState.filter(s => s !== slot); // Remove the slot if already selected
      }
      return [...prevState, slot]; // Add the slot if not selected
    });

    // Update checkIn and checkOut for the product based on selected slot
    const [start, end] = slot.split('-');
    const checkInTime = `${value.toDateString()} ${start}`;
    const checkOutTime = `${value.toDateString()} ${end}`;
    product.checkIn = new Date(checkInTime).toISOString();
    product.checkOut = new Date(checkOutTime).toISOString();
  };

  const calculateAvailableSlots = (dateString) => {
    console.log("Calculating available slots for:", dateString); // Log the date for which available slots are being calculated
    
    const allSlots = Array.from({ length: 24 }, (_, i) => {
      const start = i.toString().padStart(2, '0') + ':00';
      const end = ((i + 1) % 24).toString().padStart(2, '0') + ':00';
      return `${start}-${end}`;
    });
    
    const bookedSlots = Object.keys(bookingDetails[dateString] || {}).reduce((acc, timeSlot) => {
      // Iterate through all booked slots and add them to the "bookedSlots" array
      const slotDetails = bookingDetails[dateString][timeSlot];
      slotDetails.forEach((booking) => {
        const bookedTime = timeSlot.split(' - ');
        const bookedStart = parseInt(bookedTime[0].split(':')[0]);
        const bookedEnd = parseInt(bookedTime[1].split(':')[0]);
        acc.push({ start: bookedStart, end: bookedEnd });
      });
      return acc;
    }, []);
  
    console.log("Booked Slots:", bookedSlots); // Log the booked slots for the selected date
  
    const availableSlots = allSlots.filter(slot => {
      const [start, end] = slot.split('-').map(time => parseInt(time.split(':')[0]));
      // Check if the current slot overlaps with any booked slot
      return !bookedSlots.some(bookedSlot => {
        return (start >= bookedSlot.start && start < bookedSlot.end) || (end > bookedSlot.start && end <= bookedSlot.end);
      });
    });
    
    console.log("Available Slots:", availableSlots); // Log the available slots for the selected date
  
    return availableSlots;
  };

  const product = {
    id: 1,
    proImg: "/images/room/img-1.jpg",
    title: roomFilter,
    slug: "Lake-view-Room",
    price: "200",
    delPrice: "380",
    Des: "Our newly renovated gym is equipped with air conditioning, eco-friendly features, and a convenient half-court divider. It’s perfect for sports events, fitness classes, or recreational activities for all ages.",
    capacity: "1",
    Children: "6",
    checkIn: "",
    checkOut: "",
  };

  const addToCartProduct = (product, qty = 1, color, size) => {
    dispatch(addToCart(product, qty, color, size));
    window.location.href = '/cart';
  };

  const tileContent = ({ date, view }) => {
    const dateString = date.toDateString();
    if (filteredDates.includes(dateString)) {
      const timeSlots = Object.keys(bookingDetails[dateString]);
      return (
        <div className="tile-content">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              style={{
                backgroundColor: bookingDetails[dateString][slot].length ? 'red' : 'green',
                padding: '5px',
                margin: '2px',
                borderRadius: '4px',
                color: 'white',
              }}
            >
              {slot}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
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
                      type="radio"
                      value={title}
                      checked={roomFilter === title}
                      onChange={(e) => setRoomFilter(e.target.value)}
                    />
                    {title}
                  </label>
                </div>
              ))
            ) : (
              <p>No rooms available.</p>
            )}
            <button onClick={applyFilter}>Show availability</button>
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
              <h2>Availability for {value.toDateString()}</h2>
              <div>
                <h3>Booked Slots:</h3>
                {Object.keys(selectedBooking.bookedSlots).length > 0 ? (
                  Object.keys(selectedBooking.bookedSlots).map((timeSlot, index) => (
                    <div key={index}>
                      <strong>{timeSlot}</strong>:
                      <ul>
                        {selectedBooking.bookedSlots[timeSlot].map((booking, idx) => (
                          <li key={idx}>
                            <strong>Room:</strong> {booking.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>No bookings for this day.</p>
                )}
              </div>

              <div>
                <h3>Available Slots:</h3>
                {selectedBooking.availableSlots.length > 0 ? (
                  <ul
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {selectedBooking.availableSlots.map((slot, idx) => (
                      <li
                        key={idx}
                        style={{
                          padding: '5px 10px',
                          backgroundColor:
                            selectedSlots.includes(slot) ? '#d1ecf1' : '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No available slots for this day.</p>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '15vh',
                  }}
                >
                  <div className="select-sub" style={{ padding: '10px' }}>
                    {selectedBooking.availableSlots.length === 0 ? (
                      <span
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          border: '2px solid red',
                          backgroundColor: '#f8d7da',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          textAlign: 'center',
                        }}
                      >
                        Sold Out
                      </span>
                    ) : selectedSlots ? (
              <Link
                        href="/cart"
                        className="theme-btn-s2"
                        onClick={() => addToCartProduct(product, 1, 'red', 'large')}
                      >
                        Book Your Slot Now
                      </Link>
                    ) : (
                      <span
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          border: '2px solid red',
                          backgroundColor: '#f8d7da',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          textAlign: 'center',
                        }}
                      >
                        Select a Slot to Book
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
