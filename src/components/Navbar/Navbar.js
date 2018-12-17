import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" className="logo">eventio</NavLink>
      <div className="menu">
        <NavLink to="/events">Browse Events</NavLink>
        <NavLink to="/add">Create Event</NavLink>
        <NavLink to="/auth">Sign In</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
