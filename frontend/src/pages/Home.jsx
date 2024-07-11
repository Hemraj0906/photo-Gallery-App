




// eslint-disable-next-line no-unused-vars
import React from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import './Home.css'
const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Gallery App</h1>
      <div className="button-container justify-content-center">
        <Button variant="primary" className="me-3">
          <NavLink to="/login" className="text-decoration-none text-light">
            Login
          </NavLink>
        </Button>
        <Button variant="info">
          <NavLink to="/register" className="text-decoration-none text-light">
            Sign Up
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default Home;