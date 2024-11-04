import React from "react";
import "./AllRooms.css";
import RoomCard from "./RoomDetails/RoomCard";

const AllRooms = ({ roomData }) => {
  return (
    <div className="all-rooms-container">
      <h2>All Rooms</h2>
      <div className="rooms-list">
        {roomData.map((room) => (
          <RoomCard key={room.roomId} room={room} />
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
