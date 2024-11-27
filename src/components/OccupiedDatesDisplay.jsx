import React from "react";
import "./OccupiedDatesDisplay.css";

const OccupiedDatesDisplay = () => {
  // Hardcoded sample data
  const occupiedDates = [
    { startDate: "2024-11-01", endDate: "2024-11-05" },
    { startDate: "2024-11-10", endDate: "2024-11-15" },
    { startDate: "2024-12-01", endDate: "2024-12-03" },
    { startDate: "2025-01-05", endDate: "2025-01-10" },
  ];

  // Grouping dates by month
  const groupedDates = occupiedDates.reduce((acc, date) => {
    const month = new Date(date.startDate).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[month] = acc[month] || [];
    acc[month].push(date);
    return acc;
  }, {});

  return (
    <div className="occupied-dates-container">
      {Object.entries(groupedDates).map(([month, dates]) => (
        <div key={month} className="month-section">
          <h2 className="month-title">{month}</h2>
          <div className="date-cards">
            {dates.map((date, index) => (
              <div key={index} className="date-card">
                <p className="date-range">
                  {new Date(date.startDate).toLocaleDateString("hu")} -{" "}
                  {new Date(date.endDate).toLocaleDateString("hu")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OccupiedDatesDisplay;
