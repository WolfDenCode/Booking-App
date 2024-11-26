import React, { useContext } from "react";
import RoomImageSlider from "./RoomImageSlider";
import RoomInfo from "./Roominfo";

import OccupiedDates from "./OccupiedDates";
import "./RoomDetails.css";
import { UserContext } from "../UserContext";
import { redirect, useNavigate } from "react-router-dom";

const RoomCard = ({ room, selectedDateRange, onBookingSuccess }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleBooking = async (roomId, userId, selectedDateRange) => {
    if (!user) {
      return navigate("/auth");
    }
    console.log(user.token);
    const baseURL = "http://127.0.0.1:8000";
    const roomUrl = `${baseURL}/rooms/${roomId}/`;
    const userUrl = `${baseURL}/users/${userId}/`;

    if (selectedDateRange.startDate && !selectedDateRange.endDate) {
      selectedDateRange.endDate = selectedDateRange.startDate;
    }
    for (
      let currentDate = new Date(selectedDateRange.startDate);
      currentDate <= new Date(selectedDateRange.endDate);
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      try {
        const response = await fetch(`${baseURL}/occupied-dates/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${user.token}`,
          },
          body: JSON.stringify({
            room: roomUrl, // Full URL, e.g., /rooms/1/
            user: userUrl, // Full URL, e.g., /users/2/
            date: currentDate
              .toLocaleDateString("hu")
              .replace(/\./g, "-")
              .replace(/\s+/g, "")
              .slice(0, -1), // Format date as YYYY-MM-DD
          }),
        });
        if (!response.ok) {
          throw new Error("Booking failed");
        }
        const data = await response.json(); // Parse the JSON response
        onBookingSuccess();
        console.log("Booking successful:", data);
      } catch (error) {
        console.error("Error during booking:", error);
      }
    }
  };
  return (
    <div className="room-card">
      <RoomImageSlider images={room.images} />
      <RoomInfo room={room} />
      {selectedDateRange ? (
        <button
          className="book-room-button"
          onClick={() => handleBooking(room.id, 1, selectedDateRange)}
          disabled={!selectedDateRange.startDate}
        >
          Book Room
        </button>
      ) : null}
    </div>
  );
};

export default RoomCard;
