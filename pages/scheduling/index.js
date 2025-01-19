import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'react-calendar/dist/Calendar.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://hotel-website-backend-eosin.vercel.app/users')
      .then((response) => {
        const eventData = response.data[0]?.booked_details || [];
        setEvents(eventData);
        setFilteredEvents(eventData); // No filter initially
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

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 23 && minute > 0) break;
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
    if (!selectedRoom) {
      alert('Please select a room type first!');
      setSelectedDate(null)
      return;
    }

    setSelectedDate(date);

    const bookedSlots = filteredEvents
      .flatMap((event) =>
        event.booked_dates
          .filter((booking) => parseApiDate(booking.date).toLocaleDateString() === date.toLocaleDateString())
          .map((booking) => {
            const startTime = booking.startTime || null;
            const endTime = booking.endTime || null;
            return { startTime, endTime };
          })
      )
      .flat();

    const allSlots = generateTimeSlots();
    const updatedSlots = allSlots.map((slot) => {
      const isBooked = bookedSlots.some((booked) => {
        if (booked.startTime && booked.endTime) {
          const [startHours, startMinutes] = booked.startTime.split(':').map(Number);
          const [endHours, endMinutes] = booked.endTime.split(':').map(Number);

          const slotHours = Number(slot.split(':')[0]);
          const slotMinutes = Number(slot.split(':')[1]);

          const slotTime = slotHours * 60 + slotMinutes;
          const startTime = startHours * 60 + startMinutes;
          const endTime = endHours * 60 + endMinutes;

          return slotTime + 30 >= startTime && slotTime < endTime + 30;
        }
        return false;
      });

      return { time: slot, status: isBooked ? 'booked' : 'available' };
    });

    setTimeSlots(updatedSlots);
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
          <div className="filter-data">
            <h2 className="heading">Filter by Room Title</h2>
            <select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
              <option value="">Select Room</option>
              <option value="Gym">Gym</option>
              <option value="multi-purpose-room">Multi-Purpose Room</option>
              <option value="conference-center">Conference Center</option>
              <option value="auditorium">Auditorium</option>
              <option value="pavilion">Pavilion</option>
              <option value="firepit">Firepit</option>
            </select>
            <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
          </div>
          <div className="questions">
            <h2 className="heading">How we can <br /> Help You!</h2>
            <p>
              Need more information or assistance with booking? Don’t hesitate to reach out.
              Our friendly team is ready to answer any questions and guide you through the reservation process.
            </p>
            <button className="contact-button" onClick={() => router.push('/contact')}>
              Contact Us
            </button>
          </div>
        </div>

        <div className="calendar-section">
 
          <Calendar
            tileClassName={tileClassName}
            className="custom-calendar"
            onClickDay={handleDateClick}
          />
          {selectedDate && selectedRoom && (
            <div style={{ marginTop: '20px' }}>
              <h3>Available Time Slots for {selectedDate.toLocaleDateString()}</h3>
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
                      opacity: slot.status === 'booked' ? 0.5 : 1,
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
