import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useRouter } from 'next/router'; // For navigation

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://hotel-website-backend-eosin.vercel.app/users')
      .then((response) => {
        const eventData = response.data[0]?.booked_details || []; // Adjusted based on your API structure
        setEvents(eventData); // Set the fetched event data
        setFilteredEvents(eventData); // Initialize filtered events
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  useEffect(() => {
    // Filter events by room type selection
    if (selectedRoom === '') {
      setFilteredEvents(events); // Show all events if no room is selected
    } else {
      const filtered = events.filter((detail) => detail.room_type === selectedRoom);
      setFilteredEvents(filtered); // Update filtered events based on selected room
    }
  }, [selectedRoom, events]);

  // Utility function to parse API date format (DD-MM-YYYY)
  const parseApiDate = (apiDate) => {
    const [day, month, year] = apiDate.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Check if this date is booked for the selected room type
      const isBooked = filteredEvents.some((detail) =>
        detail.booked_dates.some(
          (booking) => parseApiDate(booking.date).toLocaleDateString() === date.toLocaleDateString()
        )
      );

      // Add custom styles based on availability or booking status
      return isBooked ? 'booked' : 'available';
    }
    return null; // No class for other views
  };

  const handleBookNow = () => {
    const userDetails = localStorage.getItem('user_details'); // Check for user details in local storage
    if (userDetails) {
      router.push('/events1'); // Redirect to /events1 if user details are present
    } else {
      router.push('/login'); // Redirect to /login if user details are missing
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Sidebar Filter for Room Types */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
          <option value="">ALL</option>
          <option value="gym">Gym</option>
          <option value="multi-purpose-room">Multi-Purpose Room</option>
          <option value="conference-center">Conference Center</option>
          <option value="auditorium">Auditorium</option>
          <option value="pavilion">Pavilion</option>
          <option value="firepit">Firepit</option>
        </select>
      </div>

      {/* Calendar Component */}
      <div>
        <Calendar
          tileClassName={tileClassName} // Apply custom class based on availability
          className="custom-calendar"
        />
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#4caf50')}
      >
        Book Now
      </button>
    </div>
  );
};

export default Events;
