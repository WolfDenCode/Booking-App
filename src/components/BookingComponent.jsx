import React, { useState } from "react";
import RoomCard from "./RoomDetails/RoomCard";
import "./BookingComponent.css";

const BookingComponent = ({ roomData, currentUser }) => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [error, setError] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(currentUser);
  const handleDateClick = (day, monthOffset = 0) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );

    if (!selectedDates.startDate || selectedDates.endDate) {
      setSelectedDates({ startDate: selectedDate, endDate: null });
    } else {
      if (selectedDate > selectedDates.startDate) {
        setSelectedDates({ ...selectedDates, endDate: selectedDate });
      } else {
        setSelectedDates({
          startDate: selectedDate,
          endDate: selectedDates.startDate,
        });
      }
    }
    setError(""); // Clear any error message on date selection
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + increment)
    );
    setCurrentDate(new Date(newDate));
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const startOfMonth = new Date(year, month, 1).getDay();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Add previous month days
    for (let i = startOfMonth - 1; i >= 0; i--) {
      days.push({ day: daysInPreviousMonth - i, monthOffset: -1 });
    }

    // Add current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({ day: i, monthOffset: 0 });
    }

    // Add next month days
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, monthOffset: 1 });
    }

    return days;
  };

  const isDateSelected = (day, monthOffset) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );

    return (
      // Check if startDate != null && is the tile, the startDate?
      (selectedDates.startDate &&
        selectedDates.startDate.getTime() === date.getTime()) ||
      // Check if endDate != null && is the tile, the endDate?
      (selectedDates.endDate &&
        selectedDates.endDate.getTime() === date.getTime()) ||
      // Check if startDate && endDate != null && is the tile between the two?
      (selectedDates.startDate &&
        selectedDates.endDate &&
        date >= selectedDates.startDate &&
        date <= selectedDates.endDate)
    );
  };

  const days = generateCalendarDays();

  const handleFilterRooms = () => {
    if (!selectedDates.startDate || !selectedDates.endDate) {
      setError("Please select a valid date range.");
      setIsFiltered(false);
      return;
    }

    const startDate = selectedDates.startDate;
    const endDate = selectedDates.endDate;

    const isDateInRange = (occupiedDate) => {
      const occupied = new Date(occupiedDate);
      return occupied >= startDate && occupied <= endDate;
    };

    const availableRooms = roomData.filter((room) =>
      room.occupiedDates.every((occ) => !isDateInRange(occ.date))
    );

    setFilteredRooms(availableRooms);
    setIsFiltered(true);
    setError("");
  };

  return (
    <div className="booking-container">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
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
              key={room.roomId}
              room={room}
              selectedDateRange={selectedDates}
            />
          ))
        ) : isFiltered && selectedDates.startDate ? (
          <p>No available rooms for the selected dates.</p>
        ) : (
          <p>Please select a date for booking.</p>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
