import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Overlay = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails(bookingId);
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const fetchBookingDetails = async (id) => {
    try {
      const response = await fetch(
        "https://hotel-website-backend-eosin.vercel.app/get-booking-details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ booking_id: id }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setBookingDetails(data.booking_details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return <div>Loading booking details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Booking Details</h1>
      {bookingDetails ? (
        <div>
          <table className="table">
            <tbody>
              <tr>
                <th>Booking ID</th>
                <td>{bookingDetails.booking_id || "N/A"}</td>
              </tr>
              <tr>
                <th>Event Name</th>
                <td>{bookingDetails.event_name || "N/A"}</td>
              </tr>
              <tr>
                <th>Room Type</th>
                <td>{bookingDetails.room_type || "N/A"}</td>
              </tr>
              <tr>
                <th>Date Option</th>
                <td>{bookingDetails.date_option || "N/A"}</td>
              </tr>
              <tr>
                <th>Attendance</th>
                <td>{bookingDetails.attendance || "N/A"}</td>
              </tr>
            </tbody>
          </table>
          <h2>Booked Dates</h2>
          {Array.isArray(bookingDetails.booked_dates) &&
          bookingDetails.booked_dates.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails.booked_dates.map((date, index) => (
                  <tr key={index}>
                    <td>{date.date || "N/A"}</td>
                    <td>{date.startTime || "N/A"}</td>
                    <td>{date.endTime || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No booked dates available.</p>
          )}
        </div>
      ) : (
        <p>No booking details found.</p>
      )}
      <div className="button-container">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
  
};

export default Overlay;