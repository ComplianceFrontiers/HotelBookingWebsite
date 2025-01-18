import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookingOverlay = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false); // Track payment status
  const [isApproved, setIsApproved] = useState(false); // Track approval status

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
      setBookingDetails(data); // Store entire response in state
      setIsApproved(data.booking_details.approved); // Update approval status
      setIsPaid(data.booking_details.paid); // Update payment status
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetch("https://hotel-website-backend-eosin.vercel.app/update-booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: bookingDetails.email,
          booking_id: bookingDetails.booking_details.booking_id,
          paid: false,
          approved: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      setIsApproved(true); // Mark as approved
      alert("Booking Approved!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handlePaid = async () => {
    try {
      const response = await fetch("https://hotel-website-backend-eosin.vercel.app/update-booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: bookingDetails.email,
          booking_id: bookingDetails.booking_details.booking_id,
          paid: true,
          approved: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      setIsPaid(true); // Mark as paid
      alert("Payment Completed!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleReject = () => {
    alert("Booking Rejected!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return <div className="booking-overlay-loading">Loading booking details...</div>;
  }

  if (error) {
    return <div className="booking-overlay-error">Error: {error}</div>;
  }

  // Destructure to get the values from the response
  const { booking_details, email, name, phone } = bookingDetails || {};

  return (
    <div className="booking-overlay-container">
      <h1>Booking Details</h1>
      {bookingDetails ? (
        <div>
          <table className="booking-overlay-table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{name || "N/A"}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{email || "N/A"}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{phone || "N/A"}</td>
              </tr>
              <tr>
                <th>Booking ID</th>
                <td>{booking_details.booking_id || "N/A"}</td>
              </tr>
              <tr>
                <th>Event Name</th>
                <td>{booking_details.event_name || "N/A"}</td>
              </tr>
              <tr>
                <th>Room Type</th>
                <td>{booking_details.room_type || "N/A"}</td>
              </tr>
              <tr>
                <th>Date Option</th>
                <td>{booking_details.date_option || "N/A"}</td>
              </tr>
              <tr>
                <th>Attendance</th>
                <td>{booking_details.attendance || "N/A"}</td>
              </tr>
            </tbody>
          </table>
          <h2>Booked Dates</h2>
          {Array.isArray(booking_details.booked_dates) &&
          booking_details.booked_dates.length > 0 ? (
            <table className="booking-overlay-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {booking_details.booked_dates.map((date, index) => (
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

      <div className="booking-overlay-buttons">
        <button className="booking-overlay-back-button" onClick={handleBack}>
          Back
        </button>

        {/* Check if booking is approved but not paid */}
        {isApproved && !isPaid ? (
          <button className="booking-overlay-paid-button" onClick={handlePaid} disabled={isPaid}>
            Mark as Paid
          </button>
        ) : (
          // Show Approve and Reject buttons if not approved
          !isApproved && (
            <>
              <button className="booking-overlay-approve-button" onClick={handleApprove}>
                Approve
              </button>
              <button className="booking-overlay-reject-button" onClick={handleReject}>
                Reject
              </button>
            </>
          )
        )}

        <button className="booking-overlay-print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default BookingOverlay;

