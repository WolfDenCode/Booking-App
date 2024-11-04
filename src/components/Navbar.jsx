import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Hotel Booking</h1>
      <ul>
        {/* <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-rooms">All Rooms</Link>
        </li> */}
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/all-rooms">All Rooms</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
