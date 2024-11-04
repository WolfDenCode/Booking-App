import React from "react";
import RoomImageSlider from "./RoomImageSlider";
import RoomInfo from "./Roominfo";

import OccupiedDates from "./OccupiedDates";
import "./RoomDetails.css";

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <RoomImageSlider images={room.images} />
      <RoomInfo room={room} />
      <OccupiedDates dates={room.occupiedDates} />
    </div>
  );
};

export default RoomCard;
