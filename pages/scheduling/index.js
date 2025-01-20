import React, { useEffect, useState, Fragment } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'react-calendar/dist/Calendar.css'; 
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const router = useRouter();

  useEffect(() => { 
    axios
      .get('https://hotel-website-backend-eosin.vercel.app/users')
      .then((response) => { 
        const eventData = response.data[1]?.booked_details || []; // Fetching second user's booked details
        setEvents(eventData);
        setFilteredEvents(eventData); // No filter initially
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
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
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return parsedDate;
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
      setSelectedDate(null);
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
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <Fragment>
      <Navbar hclass={'wpo-header-style-3'} />
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
              value={currentDate}
            />
            {selectedDate && selectedRoom ? (
              <div className="custom-calendar">
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
                      }}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
                {/* Legends Section */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'green',
                        marginRight: '5px',
                      }}
                    ></div>
                    <span>Available</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'red',
                        marginRight: '5px',
                      }}
                    ></div>
                    <span>Not Available</span>
                  </div>
                </div>
              </div>
            ) : !selectedDate ? (
              <div>
                <h3 style={{ marginTop: '20px', color: 'red' }}>* Select a date to check availability</h3>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Events;
