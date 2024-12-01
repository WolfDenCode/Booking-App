import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import RoomCard from "./RoomDetails/RoomCard";
import "./BookingComponent.css";

const BookingComponent = ({ currentUser }) => {
  return (
    <div className="booking-container">
      <div className="calendar-header">
        <button className="date-switcher" onClick={() => handleMonthChange(-1)}>
          <FaArrowLeft></FaArrowLeft>{" "}
        </button>
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button className="date-switcher" onClick={() => handleMonthChange(1)}>
          <FaArrowRight></FaArrowRight>
        </button>
      </div>

      <div className="calendar-days">
        {days.map(({ day, monthOffset }, index) => (
          <div
            key={index}
            className={`calendar-day ${
              isDateSelected(day, monthOffset) ? "selected" : ""
            } ${monthOffset !== 0 ? "overflow" : ""}`}
            onClick={() => handleDateClick(day, monthOffset)}
          >
            {day}
          </div>
        ))}
      </div>

      <button className="book-rooms-button" onClick={handleFilterRooms}>
        Book Rooms
      </button>

      {error && <div className="error-message">{error}</div>}

      <div className="filtered-rooms">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard
              onBookingSuccess={() => {
                setSelectedDates({
                  startDate: null,
                  endDate: null,
                });
                setFilteredRooms([]);
                setSuccess("Booking Succesful!");
                setTimeout(() => {
                  setSuccess("");
                  setError("");
                }, 5000);
              }}
              key={room.id}
              room={room}
              selectedDateRange={selectedDates}
            />
          ))
        ) : isFiltered && selectedDates.startDate ? (
          <p>No available rooms for the selected dates.</p>
        ) : success != "" ? (
          <p>{success}</p>
        ) : error != "" ? (
          <p>{error}</p>
        ) : (
          <p>Please select a date for booking.</p>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
