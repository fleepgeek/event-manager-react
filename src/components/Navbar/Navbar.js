import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = props => {
    return (
        <div className="navbar">
            <NavLink to="/" className="logo">
                eventio
            </NavLink>
            <div className="menu">
                <NavLink to="/events" exact>Browse Events</NavLink>
                <NavLink to="/add" exact>Create Event</NavLink>
                {props.isAuth ? (
                    <NavLink to="/logout" exact>Logout</NavLink>
                ) : (
                    <NavLink to="/auth" exact>Sign In</NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
