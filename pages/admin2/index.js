import React, { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation";

const BookingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://hotel-website-backend-eosin.vercel.app/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="booking-loading">Loading...</div>;
  if (error) return <div className="booking-error">Error: {error}</div>;

  const flattenedData = data.flatMap((user) =>
    Array.isArray(user.booked_details)
      ? user.booked_details.map((booking) => ({
          ...booking,
        }))
      : []
  );

  const handleBookingClick = (booking) => {
    const queryString = new URLSearchParams(booking).toString();
    router.push(`/overlay?${queryString}`);
  };

  return (
    <div className="booking-table-container">
      <h2>Booking Details</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Event Name</th>
            <th>Room Type</th>
            <th>Booked Dates</th>
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((booking, index) => (
            <tr key={index}>
              <td>
                <button
                  className="booking-id-button"
                  onClick={() => handleBookingClick(booking)}
                >
                  {booking.booking_id}
                </button>
              </td>
              <td>{booking.event_name}</td>
              <td>{booking.room_type}</td>
              <td>
                {booking.booked_dates?.map((date, idx) => (
                  <div key={idx}>
                    <strong>Date:</strong> {date.date},{" "}
                    <strong>Start Time:</strong> {date.startTime},{" "}
                    <strong>End Time:</strong> {date.endTime}
                  </div>
                )) || "No dates available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
