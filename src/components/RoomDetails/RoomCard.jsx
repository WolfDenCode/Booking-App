import React from "react";
import RoomImageSlider from "./RoomImageSlider";
import RoomInfo from "./Roominfo";

import OccupiedDates from "./OccupiedDates";
import "./RoomDetails.css";

const RoomCard = ({ room, selectedDateRange }) => {
  const handleBooking = (roomId, selectedDateRange) => {
    console.log(
      `${roomId} room is being booked from ${selectedDateRange.startDate} till ${selectedDateRange.endDate}`
    );
  };
  return (
    <div className="room-card">
      <RoomImageSlider images={room.images} />
      <RoomInfo room={room} />
      <OccupiedDates dates={room.occupiedDates} />
      <button
        className="book-room-button"
        onClick={() => handleBooking(room.roomId, selectedDateRange)}
        disabled={!selectedDateRange.startDate || !selectedDateRange.endDate}
      >
        Book Room
      </button>
    </div>
  );
};

export default RoomCard;
