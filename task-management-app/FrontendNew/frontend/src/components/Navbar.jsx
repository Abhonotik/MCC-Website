import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  console.log("Current location:", location.pathname); // Debug log

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Task Manager FOR MCC</h1>
        <div className="navbar-links">
          {location.pathname !== "/login" && <Link to="/login" className="navbar-link">Login</Link>}
          {location.pathname !== "/register" && <Link to="/register" className="navbar-link">Register</Link>}
          {location.pathname !== "/dashboard" && <Link to="/dashboard" className="navbar-link">Dashboard</Link>}
          {location.pathname !== "/admin" && <Link to="/admin" className="navbar-link">Admin</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;