import React from "react";

const RoomInfo = ({ room }) => {
  return (
    <div className="room-info">
      <h2>{room.roomName}</h2>
      <p>
        <strong>Type:</strong> {room.roomType}
      </p>
      <p>
        <strong>Price per Night:</strong> {room.currency} {room.pricePerNight}
      </p>
      <p>
        <strong>Max Occupancy:</strong> {room.maxOccupancy} guests
      </p>
      <p className="description">{room.description}</p>
    </div>
  );
};

export default RoomInfo;
