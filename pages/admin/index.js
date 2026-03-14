import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import "react-calendar/dist/Calendar.css";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'calendar'
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsForDate, setBookingsForDate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date"); // 'date', 'name', 'id', 'room'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [filterRoom, setFilterRoom] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));

    if (userDetails && userDetails?.Admin) {
      setIsAdmin(true);
    } else {
      alert("Please login as admin to access this page.");
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://hotel-website-backend-eosin.vercel.app/users"
          );
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

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center", fontSize: "18px" }}>
        Loading...
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        Error: {error}
      </div>
    );

  const flattenedData = data.flatMap((user) =>
    Array.isArray(user.booked_details)
      ? user.booked_details.map((booking) => ({
          ...booking,
          user_email: user.email,
          user_name: user.full_name,
        }))
      : []
  );

  const handleBookingClick = (booking) => {
    const queryString = new URLSearchParams(booking).toString();
    router.push(`/overlay?${queryString}`);
  };

  const handleDeleteBooking = async (booking) => {
    const confirmMessage =
      `Are you sure you want to delete this booking?\n\n` +
      `Booking ID: ${booking.booking_id}\n` +
      `Event Name: ${booking.event_name}\n` +
      `Room Type: ${booking.room_type}\n` +
      `User: ${booking.user_name} (${booking.user_email})\n` +
      `Dates: ${booking.booked_dates?.length || 0} date(s)`;

    if (window.confirm(confirmMessage)) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://hotel-website-backend-eosin.vercel.app/delete_booking_admin",
          {
            email: booking.user_email,
            booking_id: booking.booking_id,
          }
        );

        if (response.status === 200) {
          alert("Booking deleted successfully!");
          // Refresh the data
          const fetchResponse = await fetch(
            "https://hotel-website-backend-eosin.vercel.app/users"
          );
          const result = await fetchResponse.json();
          setData(result);
        }
      } catch (error) {
        alert(`Failed to delete booking: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter and sort bookings
  const getFilteredAndSortedBookings = () => {
    let filtered = [...flattenedData];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.booking_id?.toLowerCase().includes(query) ||
          booking.event_name?.toLowerCase().includes(query) ||
          booking.room_type?.toLowerCase().includes(query) ||
          booking.user_name?.toLowerCase().includes(query) ||
          booking.user_email?.toLowerCase().includes(query)
      );
    }

    // Apply room filter
    if (filterRoom) {
      filtered = filtered.filter((booking) => booking.room_type === filterRoom);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          // Sort by first booked date
          const dateA = a.booked_dates?.[0]?.date || "";
          const dateB = b.booked_dates?.[0]?.date || "";
          const [dayA, monthA, yearA] = dateA.split("-").map(Number);
          const [dayB, monthB, yearB] = dateB.split("-").map(Number);
          const timestampA = new Date(yearA, monthA - 1, dayA).getTime();
          const timestampB = new Date(yearB, monthB - 1, dayB).getTime();
          comparison = timestampA - timestampB;
          break;
        case "name":
          comparison = (a.event_name || "").localeCompare(b.event_name || "");
          break;
        case "id":
          comparison = (a.booking_id || "").localeCompare(b.booking_id || "");
          break;
        case "room":
          comparison = (a.room_type || "").localeCompare(b.room_type || "");
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  };

  const filteredBookings = getFilteredAndSortedBookings();

  // Parse date from DD-MM-YYYY format
  const parseApiDate = (apiDate) => {
    const [day, month, year] = apiDate.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  // Get bookings filtered by room type
  const getFilteredBookings = () => {
    if (!selectedRoom) return flattenedData;
    return flattenedData.filter(
      (booking) => booking.room_type === selectedRoom
    );
  };

  // Calculate booking percentage for a date
  const getBookingPercentage = (date) => {
    const filteredBookings = getFilteredBookings();

    // Get all bookings for this date
    const dayBookings = filteredBookings.filter((booking) =>
      booking.booked_dates?.some(
        (bookedDate) =>
          parseApiDate(bookedDate.date).toDateString() === date.toDateString()
      )
    );

    if (dayBookings.length === 0) return 0;

    // Calculate total booked hours for this date
    let totalBookedMinutes = 0;
    dayBookings.forEach((booking) => {
      booking.booked_dates?.forEach((bookedDate) => {
        if (
          parseApiDate(bookedDate.date).toDateString() === date.toDateString()
        ) {
          const [startHour, startMin] = bookedDate.startTime
            .split(":")
            .map(Number);
          const [endHour, endMin] = bookedDate.endTime.split(":").map(Number);
          const startMinutes = startHour * 60 + startMin;
          const endMinutes = endHour * 60 + endMin;
          // Use Math.abs to ensure positive duration
          const duration = Math.abs(endMinutes - startMinutes);
          totalBookedMinutes += duration;
        }
      });
    });

    // Facility hours: 9 AM to 11:30 PM = 14.5 hours = 870 minutes
    const totalAvailableMinutes = 870;
    const percentage = Math.min(
      (totalBookedMinutes / totalAvailableMinutes) * 100,
      100
    );

    // Ensure percentage is always positive
    return Math.max(0, Math.round(percentage));
  };

  // Calendar tile styling
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const percentage = getBookingPercentage(date);

      if (percentage === 0) {
        return null; // Available - will show as white
      }

      // Return a div with gradient based on percentage
      return (
        <div
          style={{
            position: "absolute",
            bottom: "1px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "9px",
            fontWeight: "600",
            color: percentage > 50 ? "white" : "#c62828",
            backgroundColor:
              percentage > 50 ? "rgba(198, 40, 40, 0.75)" : "transparent",
            padding: "1px 4px",
            borderRadius: "6px",
          }}
        >
          {percentage}%
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const percentage = getBookingPercentage(date);

      if (percentage === 0) return "available-date";
      if (percentage <= 25) return "booked-25";
      if (percentage <= 50) return "booked-50";
      if (percentage <= 75) return "booked-75";
      return "booked-100";
    }
    return null;
  };

  // Handle calendar date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const filteredBookings = getFilteredBookings();

    const bookings = filteredBookings
      .filter((booking) =>
        booking.booked_dates?.some(
          (bookedDate) =>
            parseApiDate(bookedDate.date).toDateString() === date.toDateString()
        )
      )
      .map((booking) => ({
        ...booking,
        relevantDate: booking.booked_dates.find(
          (bookedDate) =>
            parseApiDate(bookedDate.date).toDateString() === date.toDateString()
        ),
      }));

    setBookingsForDate(bookings);
  };

  return (
    <Fragment>
      <Navbar hclass={"wpo-header-style-3"} />
      <div
        style={{
          maxWidth: "1400px",
          margin: "20px auto",
          padding: "16px",
          backgroundColor: "#fff",
          minHeight: "80vh",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "2px solid #3498db",
            paddingBottom: "12px",
          }}
        >
          <h1
            style={{
              fontSize: "22px",
              color: "#2c3e50",
              margin: 0,
              fontWeight: "600",
            }}
          >
            Admin Dashboard
          </h1>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setViewMode("table")}
              style={{
                padding: "8px 16px",
                backgroundColor: viewMode === "table" ? "#3498db" : "#ecf0f1",
                color: viewMode === "table" ? "white" : "#2c3e50",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "13px",
                transition: "all 0.2s",
                boxShadow:
                  viewMode === "table" ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
              }}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  viewMode === "calendar" ? "#3498db" : "#ecf0f1",
                color: viewMode === "calendar" ? "white" : "#2c3e50",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "13px",
                transition: "all 0.2s",
                boxShadow:
                  viewMode === "calendar"
                    ? "0 2px 4px rgba(0,0,0,0.1)"
                    : "none",
              }}
            >
              Calendar View
            </button>
          </div>
        </div>

        {/* Search and Filter Controls - Show only in Table View */}
        {viewMode === "table" && (
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              border: "1px solid #e0e0e0",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {/* Search Box */}
              <div>
                <input
                  type="text"
                  placeholder="Search by ID, Event, Room, or User..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
              </div>

              {/* Room Filter */}
              <div>
                <select
                  value={filterRoom}
                  onChange={(e) => setFilterRoom(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  <option value="">All Rooms</option>
                  <option value="Gym">Gym</option>
                  <option value="multi-purpose-room">Multi-Purpose Room</option>
                  <option value="conference-center">Conference Center</option>
                  <option value="auditorium">Auditorium</option>
                  <option value="pavilion">Pavilion</option>
                  <option value="firepit">Firepit</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Event Name</option>
                  <option value="id">Sort by Booking ID</option>
                  <option value="room">Sort by Room</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "13px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              {searchQuery && ` (filtered by search: "${searchQuery}")`}
              {filterRoom && ` (filtered by room: ${filterRoom})`}
            </div>
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                All Bookings ({filteredBookings.length})
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#3498db", color: "white" }}>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Booking ID
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Event Name
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Room Type
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Booked Dates
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      User
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Flexible
                    </th>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f8f9fa" : "white",
                          borderBottom: "1px solid #e0e0e0",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#e3f2fd")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            index % 2 === 0 ? "#f8f9fa" : "white")
                        }
                      >
                        <td style={{ padding: "8px 10px" }}>
                          <button
                            onClick={() => handleBookingClick(booking)}
                            style={{
                              backgroundColor: "#3498db",
                              color: "white",
                              border: "none",
                              padding: "5px 12px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            {booking.booking_id}
                          </button>
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontWeight: "500",
                            fontSize: "13px",
                          }}
                        >
                          {booking.event_name}
                        </td>
                        <td style={{ padding: "8px 10px" }}>
                          <span
                            style={{
                              backgroundColor: "#e3f2fd",
                              padding: "3px 8px",
                              borderRadius: "10px",
                              fontSize: "11px",
                              fontWeight: "500",
                              color: "#1976d2",
                            }}
                          >
                            {booking.room_type}
                          </span>
                        </td>
                        <td style={{ padding: "8px 10px" }}>
                          {booking.booked_dates
                            ?.slice(0, 2)
                            .map((date, idx) => (
                              <div
                                key={idx}
                                style={{
                                  marginBottom: "3px",
                                  fontSize: "12px",
                                }}
                              >
                                <strong>{date.date}</strong> • {date.startTime}{" "}
                                - {date.endTime}
                              </div>
                            )) || "No dates"}
                          {booking.booked_dates?.length > 2 && (
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#666",
                                marginTop: "3px",
                              }}
                            >
                              +{booking.booked_dates.length - 2} more
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "8px 10px", fontSize: "12px" }}>
                          <div style={{ fontWeight: "500" }}>
                            {booking.user_name}
                          </div>
                          <div style={{ color: "#666", fontSize: "11px" }}>
                            {booking.user_email}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            fontSize: "12px",
                          }}
                        >
                          <span
                            style={{
                              padding: "3px 8px",
                              borderRadius: "10px",
                              fontSize: "11px",
                              fontWeight: "500",
                              backgroundColor: booking.flexible
                                ? "#e8f5e9"
                                : "#f5f5f5",
                              color: booking.flexible ? "#2e7d32" : "#666",
                            }}
                          >
                            {booking.flexible ? "Yes" : "No"}
                          </span>
                        </td>
                        <td
                          style={{ padding: "8px 10px", textAlign: "center" }}
                        >
                          <button
                            onClick={() => handleDeleteBooking(booking)}
                            style={{
                              backgroundColor: "#ff5252",
                              color: "white",
                              border: "none",
                              padding: "5px 12px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "500",
                              fontSize: "11px",
                              transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#d32f2f")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#ff5252")
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#666",
                          fontSize: "13px",
                        }}
                      >
                        No bookings match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <div>
            {/* Room Filter */}
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "16px",
                border: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2c3e50",
                }}
              >
                Filter by Room:
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                  setSelectedDate(null);
                  setBookingsForDate([]);
                }}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  borderRadius: "6px",
                  border: "1px solid #3498db",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontWeight: "500",
                  minWidth: "200px",
                }}
              >
                <option value="">All Rooms</option>
                <option value="Gym">Gym</option>
                <option value="multi-purpose-room">Multi-Purpose Room</option>
                <option value="conference-center">Conference Center</option>
                <option value="auditorium">Auditorium</option>
                <option value="pavilion">Pavilion</option>
                <option value="firepit">Firepit</option>
              </select>
            </div>

            {/* Calendar */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              }}
            >
              <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
                tileContent={tileContent}
                value={selectedDate}
                style={{ width: "100%" }}
              />

              {/* Legend */}
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px 16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#2c3e50",
                  }}
                >
                  Booking Density
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      0%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        background:
                          "linear-gradient(to top, #ffcdd2 50%, #ffffff 50%)",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      1-25%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        background:
                          "linear-gradient(to top, #ef9a9a 50%, #ffcdd2 50%)",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      26-50%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        background:
                          "linear-gradient(to top, #e57373 75%, #ef9a9a 25%)",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      51-75%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        backgroundColor: "#d32f2f",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      76-100%
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    margin: "10px 0 0 0",
                    fontSize: "11px",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  % based on facility hours (9 AM - 11:30 PM)
                </p>
              </div>
            </div>

            {/* Selected Date Details */}
            {selectedDate && (
              <div
                style={{
                  marginTop: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#3498db",
                    color: "white",
                  }}
                >
                  <h3
                    style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}
                  >
                    Bookings for{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </h3>
                </div>

                {bookingsForDate.length > 0 ? (
                  <div style={{ padding: "16px" }}>
                    {bookingsForDate.map((booking, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "12px",
                          borderRadius: "6px",
                          marginBottom: "12px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "12px",
                          }}
                        >
                          <div>
                            <strong
                              style={{
                                color: "#666",
                                fontSize: "10px",
                                textTransform: "uppercase",
                              }}
                            >
                              Booking ID
                            </strong>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#3498db",
                                marginTop: "3px",
                              }}
                            >
                              {booking.booking_id}
                            </div>
                          </div>
                          <div>
                            <strong
                              style={{
                                color: "#666",
                                fontSize: "10px",
                                textTransform: "uppercase",
                              }}
                            >
                              Event Name
                            </strong>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                marginTop: "3px",
                              }}
                            >
                              {booking.event_name}
                            </div>
                          </div>
                          <div>
                            <strong
                              style={{
                                color: "#666",
                                fontSize: "10px",
                                textTransform: "uppercase",
                              }}
                            >
                              Time Slot
                            </strong>
                            <div
                              style={{
                                fontSize: "13px",
                                marginTop: "3px",
                                color: "#27ae60",
                                fontWeight: "600",
                              }}
                            >
                              {booking.relevantDate.startTime} -{" "}
                              {booking.relevantDate.endTime}
                            </div>
                          </div>
                          <div>
                            <strong
                              style={{
                                color: "#666",
                                fontSize: "10px",
                                textTransform: "uppercase",
                              }}
                            >
                              Booked By
                            </strong>
                            <div
                              style={{
                                fontSize: "13px",
                                marginTop: "3px",
                                fontWeight: "500",
                              }}
                            >
                              {booking.user_name}
                            </div>
                            <div style={{ fontSize: "11px", color: "#666" }}>
                              {booking.user_email}
                            </div>
                          </div>
                          <div>
                            <strong
                              style={{
                                color: "#666",
                                fontSize: "10px",
                                textTransform: "uppercase",
                              }}
                            >
                              Room Type
                            </strong>
                            <div style={{ fontSize: "13px", marginTop: "3px" }}>
                              {booking.room_type}
                            </div>
                          </div>
                          {/* COMMENTED OUT - Status field
 <div>
 <strong style={{ color: '#666', fontSize: '10px', textTransform: 'uppercase' }}>Status</strong>
 <div style={{ marginTop: '3px' }}>
 <span style={{
 padding: '4px 8px',
 borderRadius: '10px',
 fontSize: '11px',
 fontWeight: '600',
 backgroundColor: booking.reject ? '#ffebee' :
 booking.paid ? '#e8f5e9' :
 booking.approved ? '#fff3e0' : '#f5f5f5',
 color: booking.reject ? '#c62828' :
 booking.paid ? '#2e7d32' :
 booking.approved ? '#ef6c00' : '#666'
 }}>
 {booking.reject ? "Rejected" :
 booking.paid ? "Paid" :
 booking.approved ? "Pending Pay" :
 "Pending"}
 </span>
 </div>
 </div>
 */}
                        </div>
                        <button
                          onClick={() => handleBookingClick(booking)}
                          style={{
                            marginTop: "12px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            padding: "6px 14px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "12px",
                          }}
                        >
                          View Details →
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "30px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                      📭
                    </div>
                    <p style={{ fontSize: "14px", margin: 0 }}>
                      No bookings for this date
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .available-date {
          background-color: #ffffff !important;
          color: #2c3e50 !important;
          border: 1px solid #e0e0e0 !important;
          border-radius: 8px;
          position: relative;
        }
        .booked-25 {
          background: linear-gradient(
            to top,
            #ffcdd2 25%,
            #ffffff 75%
          ) !important;
          color: #2c3e50 !important;
          border-radius: 8px;
          position: relative;
        }
        .booked-50 {
          background: linear-gradient(
            to top,
            #ef9a9a 50%,
            #ffcdd2 50%
          ) !important;
          color: #2c3e50 !important;
          border-radius: 8px;
          position: relative;
        }
        .booked-75 {
          background: linear-gradient(
            to top,
            #e57373 75%,
            #ef9a9a 25%
          ) !important;
          color: white !important;
          border-radius: 8px;
          position: relative;
        }
        .booked-100 {
          background-color: #d32f2f !important;
          color: white !important;
          border-radius: 8px;
          position: relative;
        }
        .react-calendar {
          width: 100% !important;
          border: none !important;
          font-family: inherit !important;
        }
        .react-calendar__tile {
          padding: 12px 6px !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          position: relative !important;
          min-height: 45px !important;
        }
        .react-calendar__tile--active {
          background: #3498db !important;
          color: white !important;
        }
        .react-calendar__tile:enabled:hover {
          opacity: 0.8;
        }
        .react-calendar__navigation button {
          font-size: 16px !important;
          font-weight: 600 !important;
          color: #2c3e50 !important;
          min-height: 36px !important;
        }
        .react-calendar__month-view__weekdays {
          font-weight: 600 !important;
          color: #2c3e50 !important;
          font-size: 12px !important;
        }
      `}</style>
      <Footer />
    </Fragment>
  );
};

export default AdminPanel;
