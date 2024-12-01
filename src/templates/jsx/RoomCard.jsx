import React, { useContext } from "react";
import RoomImageSlider from "./RoomImageSlider";
import RoomInfo from "./Roominfo";

import "./RoomDetails.css";
import { UserContext } from "../UserContext";
import { redirect, useNavigate } from "react-router-dom";

const RoomCard = ({ room, selectedDateRange, onBookingSuccess }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleBooking = async (roomId, userId, selectedDateRange) => {};
  return (
    <div className="room-card">
      <RoomImageSlider images={room.images} />
      <RoomInfo room={room} />
      {selectedDateRange ? (
        <button
          className="book-room-button"
          onClick={() =>
            handleBooking(room.id, user.user.id, selectedDateRange)
          }
          disabled={!selectedDateRange.startDate}
        >
          Book Room
        </button>
      ) : null}
    </div>
  );
};

export default RoomCard;
