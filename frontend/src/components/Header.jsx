

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className="nav-link">
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

