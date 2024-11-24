import React, { useEffect, useState } from "react";
import RoomCard from "./RoomDetails/RoomCard";
import "./BookingComponent.css";

const BookingComponent = ({ currentUser }) => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [error, setError] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(currentUser);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    async function fetchRoomData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/rooms/", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch room data.");
        }

        const data = await response.json(); // Parse the JSON response

        console.log("Fetching successful:", data);
        setRoomData(data);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
    fetchRoomData();
  }, []);

  const handleDateClick = (day, monthOffset = 0) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );

    if (!selectedDates.startDate || selectedDates.endDate) {
      // If no dates are selected or both are already set, reset to a single date
      setSelectedDates({ startDate: selectedDate, endDate: null });
    } else if (selectedDate.getTime() === selectedDates.startDate.getTime()) {
      // If clicking the same date again, treat as a single-day selection
      setSelectedDates({ startDate: selectedDate, endDate: selectedDate });
    } else {
      // Set the endDate if selecting a valid range
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
    if (!selectedDates.startDate) {
      setError("Please select a valid date.");
      setIsFiltered(false);
      return;
    }

    // If endDate is null, fall back to startDate for single-day booking
    const startDate = selectedDates.startDate;
    const endDate = selectedDates.endDate || selectedDates.startDate;

    const isDateInRange = (occupiedDate) => {
      const occupied = new Date(occupiedDate);
      occupied.setHours(0, 0, 0, 0);
      console.log(occupied, new Date(startDate));

      let fallsIntoRange = true;

      if (endDate.getTime() != startDate.getTime()) {
        console.log("first cond");
        fallsIntoRange = occupied >= startDate && occupied <= endDate;
      } else {
        console.log("second cond");
        fallsIntoRange = occupied.getTime() === startDate.getTime();
      }

      console.log(
        "The set range: " +
          new Date(startDate) +
          " " +
          new Date(endDate) +
          " The occupied Date being checked: " +
          occupied,
        fallsIntoRange
      );
      return fallsIntoRange;
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
              key={room.id}
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
