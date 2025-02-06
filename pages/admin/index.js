import React, { useEffect, useState ,Fragment} from "react";
import { useRouter } from "next/navigation";
import Navbar from '../../components/Navbar';
// import Footer from '../../components/footer';
const BookingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    if (userDetails && userDetails?.Admin) {
      // User is an admin, allow access
      setIsAdmin(true);
    } else {
      // User is not an admin, show alert and redirect to login
      alert("Please login as admin to access this page.");
      router.push("/login");
    }
  },[]);

  useEffect(() => {
    if (isAdmin) {
      const fetchData = async () => {
        try {
          const response = await fetch("https://hotel-website-backend-eosin.vercel.app/users_without_admin");
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
    }
  }, [isAdmin]);

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
     <Fragment>
          <Navbar hclass={'wpo-header-style-3'} />
    <div className="booking-table-container">
      <h2>Booking Details</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Event Name</th>
            <th>Room Type</th>
            <th>Booked Dates</th>
            <th>Total Amount</th>
            <th>Last Action Done By</th>
            <th>Status</th>
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
              <td>{booking.estimatedTotal}$</td>
              <td>{booking.Admin_name} {booking.Admin_email}</td>
              <td>
                {booking.reject 
                  ? "Rejected" 
                  : (booking.approved && !booking.paid) 
                    ? "Approved (Payment Pending)" 
                    : booking.paid 
                      ? "Paid" 
                      : "No Action Done"}
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <Footer /> */}
    </Fragment>
  );
};

export default BookingTable;
