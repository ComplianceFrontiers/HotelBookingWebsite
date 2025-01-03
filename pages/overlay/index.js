import { useSearchParams } from "next/navigation";

const Overlay = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  // Fetch booking details based on the bookingId (optional if passed via query)
  // Alternatively, you can pass all booking details when navigating.

  return (
    <div>
      <h1>Booking Details</h1>
      <p><strong>Booking ID:</strong> {bookingId}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default Overlay;
