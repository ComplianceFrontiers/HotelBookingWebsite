import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'react-calendar/dist/Calendar.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [timeSlots, setTimeSlots] = useState([]); // State for time slots
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://hotel-website-backend-eosin.vercel.app/users')
      .then((response) => {
        const eventData = response.data[0]?.booked_details || [];
        setEvents(eventData);
        setFilteredEvents(eventData);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  useEffect(() => {
    if (selectedRoom === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((detail) => detail.room_type === selectedRoom);
      setFilteredEvents(filtered);
    }
  }, [selectedRoom, events]);

  const parseApiDate = (apiDate) => {
    const [day, month, year] = apiDate.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  // Function to generate time slots every 30 minutes (00:00, 00:30, 01:00, etc.)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slot = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push(slot);
      }
    }
    return slots;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isBooked = filteredEvents.some((detail) =>
        detail.booked_dates.some(
          (booking) => parseApiDate(booking.date).toLocaleDateString() === date.toLocaleDateString()
        )
      );
      return isBooked ? 'booked' : 'available';
    }
    return null;
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
  
    // Fetch booked slots for the selected date
    const bookedSlots = filteredEvents
      .flatMap((event) =>
        event.booked_dates
          .filter((booking) => parseApiDate(booking.date).toLocaleDateString() === date.toLocaleDateString())
          .map((booking) => {
            console.log('Booking Object:', booking);
  
            const startTime = booking.startTime ? booking.startTime : null;
            const endTime = booking.endTime ? booking.endTime : null;
  
            console.log(`Booking Date: ${booking.date}, Start Time: ${startTime}, End Time: ${endTime}`);
  
            return { startTime, endTime };
          })
      )
      .flat();
  
    console.log(`Booked Slots for Selected Date:`, bookedSlots);
  
    const allSlots = generateTimeSlots();  // Generate all available time slots
    const updatedSlots = allSlots.map((slot) => {
      const isBooked = bookedSlots.some((booked) => {
        if (booked.startTime && booked.endTime) {
          const [startHours, startMinutes] = booked.startTime.split(':').map(Number);
          const [endHours, endMinutes] = booked.endTime.split(':').map(Number);
  
          const slotHours = Number(slot.split(':')[0]);
          const slotMinutes = Number(slot.split(':')[1]);
  
          const slotTime = slotHours * 60 + slotMinutes;  // Convert slot to minutes
          const startTime = startHours * 60 + startMinutes;  // Convert start time to minutes
          const endTime = endHours * 60 + endMinutes;  // Convert end time to minutes
  
          console.log(`Checking Slot: ${slot} (Slot Time: ${slotTime} minutes)`);
          console.log(`Booking Start Time: ${startTime}, Booking End Time: ${endTime}`);
  
          // Check if slot is between startTime and endTime inclusively
          const isSlotBooked = slotTime+ 30 >= startTime && slotTime < endTime + 30;  // +30 because the booking ends at 16:27, not 16:30 exactly.
  
          console.log(`Is Slot ${slot} booked? ${isSlotBooked}`);
          return isSlotBooked;
        }
        return false;
      });
  
      return { time: slot, status: isBooked ? 'booked' : 'available' }; // Mark slot as booked or available
    });
  
    console.log(`Updated Slots for Selected Date:`, updatedSlots);
    setTimeSlots(updatedSlots); // Update the state with the slot statuses
  };
  
  
  
  const handleBookNow = () => {
    const userDetails = localStorage.getItem('user_details');
    if (userDetails) {
      router.push('/events1');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="admin">
      <div className="admin-container">

              <div className="filter-section">
                <div className='filter-data'>
                <h2 className="heading">Filter by Room Title</h2>
                <select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
                <option value="">ALL</option>
                <option value="gym">Gym</option>
                <option value="multi-purpose-room">Multi-Purpose Room</option>
                <option value="conference-center">Conference Center</option>
                <option value="auditorium">Auditorium</option>
                <option value="pavilion">Pavilion</option>
                <option value="firepit">Firepit</option>
              </select>
                <button    onClick={handleBookNow}>Book Now</button> {/* Filter button */}
                <div>
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
                          <h2 className="heading">How we can  <br /> Help You!</h2>
                          <p>Need more information or assistance with booking? Don’t hesitate to reach out. Our friendly team is ready to answer any questions and guide you through the reservation process to ensure your experience is seamless and enjoyable.</p>
                          <button class="contact-button" href="/contact" >
                            Contact Us
                          </button>
                </div>
              </div>
        
            <div className="calendar-section">
            <div>
              <Calendar
                tileClassName={tileClassName}
                className="custom-calendar"
                onClickDay={handleDateClick}
              />
            </div>
          

            {/* Display Selected Date and Time Slots */}
            {selectedDate && (
              <div style={{ marginTop: '20px' }}>
                <h3>Time Slots for {selectedDate.toLocaleDateString()}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: slot.status === 'booked' ? 'red' : 'green',
                        color: '#fff',
                        borderRadius: '5px',
                        textAlign: 'center',
                        opacity: slot.status === 'booked' ? 0.5 : 1, // Optional: make booked slots look less clickable
                      }}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>
            )}
      
          </div> 
      </div>
    </div> 
  );
};

export default Events;
