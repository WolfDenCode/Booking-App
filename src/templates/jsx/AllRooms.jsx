import React from "react";
import "./AllRooms.css";
import RoomCard from "./RoomDetails/RoomCard";
import { useState, useEffect } from "react";
const AllRooms = () => {
  const [roomData, setRoomData] = useState([]);

  return (
    <div className="all-rooms-container">
      <h2>All Rooms</h2>
      <div className="rooms-list">
        {roomData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
