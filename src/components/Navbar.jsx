import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "./UserContext";
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <nav className="navbar">
      <h1>Hotel Booking</h1>
      <ul>
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="all-rooms">All Rooms</Link>
        </li>
        {user == null ? (
          <li>
            <Link to="auth">Login</Link>
          </li>
        ) : (
          <li>Logout</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
