import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image'
import LoadingGif from "../../public/images/loading.gif";
const BookingOverlay = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const action = searchParams.get("action");

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [AdminName, setAdminName] = useState("");
  const [AdminEmail, setAdminEmail] = useState("");
  const [stripeLink, setStripeLink] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [isRejected, setIsRejected] = useState(false);
  const [showAcceptInput, setShowAcceptInput] = useState(false);
  const [acceptComments, setAcceptComments] = useState("");
  const [securityDepositAmount, setSecurityDepositAmount] = useState("");
  const [rentalAmount, setRentalAmount] = useState("");
  const [spokenToCustomer, setSpokenToCustomer] = useState(false);

  const handleStripeLinkChange = (e) => {
    setStripeLink(e.target.value);
  };

  // Format room type for display
  const formatRoomType = (roomType) => {
    if (!roomType) return "N/A";
    if (roomType === "multi-purpose-room") return "Multi-Purpose Room";
    if (roomType === "conference-center") return "Conference Center";
    return roomType.charAt(0).toUpperCase() + roomType.slice(1);
  };
  useEffect(() => {
    // Retrieve user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    
    if (userDetails) {
      const { email,full_name } = userDetails;
      console.log(userDetails)
      setAdminEmail(email);
      setAdminName(full_name);
    
    }
  }, []);
  
  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails(bookingId);
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    // Auto-open Accept or Decline form based on action parameter
    if (action === 'accept' && bookingDetails && !isApproved && !isRejected) {
      setShowAcceptInput(true);
    } else if (action === 'decline' && bookingDetails && !isApproved && !isRejected) {
      setShowRejectInput(true);
    }
  }, [action, bookingDetails, isApproved, isRejected]);

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
      setBookingDetails(data);
      setIsApproved(data.booking_details.approved || false);
      setIsPaid(data.booking_details.paid || false);
      setIsRejected(data.booking_details.reject || false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectNote.trim()) {
      alert("Please add a note before rejecting.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        "https://hotel-website-backend-eosin.vercel.app/send_email_to_user_request_got_rejected",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: bookingDetails.email,
            booking_id: bookingDetails.booking_details.booking_id,
            user_name: bookingDetails.name,
            event_name: bookingDetails.booking_details.event_name,
            room_type: formatRoomType(bookingDetails.booking_details.room_type),
            booked_dates: bookingDetails.booking_details.booked_dates,
            reason: rejectNote,
            spoken_to_customer: spokenToCustomer,
          }),
        }
      );

      const response1 = await fetch("https://hotel-website-backend-eosin.vercel.app/update-booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Admin_name: AdminName,
          Admin_email: AdminEmail,
          email: bookingDetails.email,
          booking_id: bookingDetails.booking_details.booking_id,
          reject: true,
          approve: false,
          paid: false,
          decline_reason: rejectNote,
          spoken_to_customer: spokenToCustomer,
        }),
      });
  
      if (!response1.ok) {
        throw new Error("Failed to update booking status");
      }
      const updatedBookingDetails = { 
        ...bookingDetails,
        booking_details: {
          ...bookingDetails.booking_details,
          reject: true,
          approve: false,
          paid: false,
        },
      };
  
      setBookingDetails(updatedBookingDetails);
   
      setIsRejected(true);
      setShowRejectInput(false);
      alert("Booking declined successfully! Email notification has been sent to the customer. You can now go back to the admin page.");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

  const handleShowRejectInput = () => {
    setShowRejectInput(true);
  };

  const handleShowAcceptInput = () => {
    setShowAcceptInput(true);
  };

  const handleApprove = async () => {
    if (!securityDepositAmount.trim() || !rentalAmount.trim()) {
      alert("Please enter Security Deposit Amount and Rental Amount before accepting.");
      return;
    }

    const totalAmount = (parseFloat(securityDepositAmount) + parseFloat(rentalAmount)).toFixed(2);

    try {
      setLoading(true)
      // Step 1: Send a request to update the booking status to approved
      const response = await fetch(
        "https://hotel-website-backend-eosin.vercel.app/update-booking-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Admin_name: AdminName,
            Admin_email: AdminEmail,
            email: bookingDetails.email,
            booking_id: bookingDetails.booking_details.booking_id,
            paid: false,
            approved: true,
            security_deposit: securityDepositAmount,
            rental_amount: rentalAmount,
            total_amount: totalAmount,
            admin_comments: acceptComments || "N/A",
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }
  
      // Step 2: Call the /send_email_to_user_request_got_approved API
      const emailResponse = await fetch(
        "https://hotel-website-backend-eosin.vercel.app/send_email_to_user_request_got_approved",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: bookingDetails.email,
            booking_id: bookingDetails.booking_details.booking_id,
            user_name: bookingDetails.name,
            event_name: bookingDetails.booking_details.event_name,
            room_type: formatRoomType(bookingDetails.booking_details.room_type),
            booked_dates: bookingDetails.booking_details.booked_dates,
            amount: totalAmount,
            security_deposit: securityDepositAmount,
            rental_amount: rentalAmount,
            comments: acceptComments || "N/A",
          }),
        }
      );
  
      if (!emailResponse.ok) {
        throw new Error("Failed to send email notification");
      }
  
      // Step 3: Update local state and alert success
      setIsApproved(true); // Mark as approved
      setShowAcceptInput(false);
      alert("Booking approved successfully! Email notification has been sent to the customer. You can now go back to the admin page.");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

 
  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return <div  style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100px",
      height: "100px",
      zIndex: 1000,
    }}>
    <Image src={LoadingGif} alt="Loading..." width={100} height={100} />
  </div>;
  }

  if (error) {
    return <div className="booking-overlay-error">Error: {error}</div>;
  }

  const { booking_details, email, name, phone } = bookingDetails || {};
  const additionalItems = booking_details?.additionalItems || [];

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
                <td>{formatRoomType(booking_details.room_type)}</td>
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

          {/* Admin Decision Details */}
          {(booking_details.approved || booking_details.reject) && (
            <>
              <h2 style={{ marginTop: "30px" }}>Admin Decision</h2>
              <table className="booking-overlay-table">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span style={{
                        padding: "5px 12px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: booking_details.reject ? "#ffebee" : "#e8f5e9",
                        color: booking_details.reject ? "#c62828" : "#2e7d32",
                      }}>
                        {booking_details.reject ? "✗ Declined" : "✓ Approved"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Admin Name</th>
                    <td>{booking_details.Admin_name || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Admin Email</th>
                    <td>{booking_details.Admin_email || "N/A"}</td>
                  </tr>

                  {/* Show approval details if approved */}
                  {booking_details.approved && !booking_details.reject && (
                    <>
                      <tr>
                        <th>Security Deposit (Refundable)</th>
                        <td>${booking_details.security_deposit || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Rental Amount</th>
                        <td>${booking_details.rental_amount || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Total Amount</th>
                        <td style={{ fontWeight: "700", fontSize: "16px", color: "#2e7d32" }}>
                          ${booking_details.total_amount || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th>Admin Comments</th>
                        <td>{booking_details.admin_comments || "N/A"}</td>
                      </tr>
                    </>
                  )}

                  {/* Show decline details if rejected */}
                  {booking_details.reject && (
                    <>
                      <tr>
                        <th>Decline Reason</th>
                        <td>{booking_details.decline_reason || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Spoken to Customer</th>
                        <td>
                          <span style={{
                            padding: "3px 8px",
                            borderRadius: "10px",
                            fontSize: "11px",
                            fontWeight: "600",
                            backgroundColor: booking_details.spoken_to_customer ? "#e3f2fd" : "#f5f5f5",
                            color: booking_details.spoken_to_customer ? "#1976d2" : "#666",
                          }}>
                            {booking_details.spoken_to_customer ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </>
          )}


          <h2>Booked Dates</h2>
          {Array.isArray(booking_details.booked_dates) && booking_details.booked_dates.length > 0 ? (
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

          {/* Additional Items Table
          <h2>Additional Items</h2>
          {additionalItems.length > 0 ? (
            <table className="booking-overlay-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Date(s)</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {additionalItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item || "N/A"}</td>
                    <td>{item.dates || "N/A"}</td>
                    <td>{item.quantity || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No additional items available.</p>
          )}
 <tr>
  <h2>Estimated Total (Including Advance 200$)  : </h2>
  <th style={{ fontSize: "20px", fontWeight: "bold" }}>
  {booking_details.estimatedTotal ?? "N/A"}$
</th>

</tr>

          <div className="stripe-link-container">
            <h2>Stripe Payment Link</h2>
            <input
              type="text"
              placeholder="Enter Stripe link"
              value={stripeLink}
              onChange={handleStripeLinkChange}
              className="stripe-link-input"
            />
          </div>

 */}
        </div>
      ) : (
        <p>No booking details found.</p>
      )}

      {/* Accept/Decline Section */}
      {bookingDetails && !isApproved && !isRejected && (showAcceptInput || showRejectInput) && (
        <div style={{ marginTop: "30px" }}>
          {/* Accept Input Form */}
          {showAcceptInput && (
            <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", border: "2px solid #4caf50" }}>
              <h3 style={{ marginBottom: "20px", color: "#4caf50", fontSize: "18px", fontWeight: "700" }}>Approve Booking</h3>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
                  Comments (Optional)
                </label>
                <textarea
                  value={acceptComments}
                  onChange={(e) => setAcceptComments(e.target.value)}
                  placeholder="Enter any additional comments..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    minHeight: "80px",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
                  Security Deposit Amount (Refundable) *
                </label>
                <input
                  type="number"
                  value={securityDepositAmount}
                  onChange={(e) => setSecurityDepositAmount(e.target.value)}
                  placeholder="Enter security deposit amount"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
                  Rental Amount *
                </label>
                <input
                  type="number"
                  value={rentalAmount}
                  onChange={(e) => setRentalAmount(e.target.value)}
                  placeholder="Enter rental amount"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleApprove}
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Confirm Accept
                </button>
                <button
                  onClick={() => {
                    setShowAcceptInput(false);
                    setAcceptComments("");
                    setSecurityDepositAmount("");
                    setRentalAmount("");
                  }}
                  style={{
                    backgroundColor: "#9e9e9e",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Decline Input Form */}
          {showRejectInput && (
            <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", border: "2px solid #ff5252" }}>
              <h3 style={{ marginBottom: "20px", color: "#ff5252", fontSize: "18px", fontWeight: "700" }}>Decline Booking</h3>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  placeholder="Enter reason for declining the booking..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    minHeight: "100px",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", fontSize: "14px" }}>
                  Spoken to Customer *
                </label>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="spokenToCustomer"
                      checked={spokenToCustomer === true}
                      onChange={() => setSpokenToCustomer(true)}
                      style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Yes</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="spokenToCustomer"
                      checked={spokenToCustomer === false}
                      onChange={() => setSpokenToCustomer(false)}
                      style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>No</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleReject}
                  style={{
                    backgroundColor: "#ff5252",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Confirm Decline
                </button>
                <button
                  onClick={() => {
                    setShowRejectInput(false);
                    setRejectNote("");
                    setSpokenToCustomer(false);
                  }}
                  style={{
                    backgroundColor: "#9e9e9e",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status Messages */}
      {isApproved && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px", border: "2px solid #4caf50" }}>
          <h3 style={{ color: "#4caf50", margin: 0 }}>✓ Booking Accepted</h3>
          <p style={{ margin: "10px 0 0 0" }}>This booking has been accepted and the customer has been notified.</p>
        </div>
      )}

      {isRejected && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#ffebee", borderRadius: "8px", border: "2px solid #ff5252" }}>
          <h3 style={{ color: "#ff5252", margin: 0 }}>✗ Booking Declined</h3>
          <p style={{ margin: "10px 0 0 0" }}>This booking has been declined and the customer has been notified.</p>
        </div>
      )}

      <div className="booking-overlay-buttons">
        <button className="booking-overlay-back-button" onClick={handleBack}>
          Back
        </button>
        <button className="booking-overlay-print-button" onClick={handlePrint}>
          Print
        </button>

        {/* Show Accept/Decline buttons if booking is not yet accepted or rejected */}
        {bookingDetails && !isApproved && !isRejected && (
          <>
            <button
              onClick={handleShowAcceptInput}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Accept
            </button>
            <button
              onClick={handleShowRejectInput}
              style={{
                backgroundColor: "#ff5252",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingOverlay;
