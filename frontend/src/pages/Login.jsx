


// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation for email and password fields
    if (!email ) {
      toast.error("Email are required.");
      return;
    }
    if ( !password) {
      toast.error("password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate("/gallery");
      } else {
        toast.error("Login failed! Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Email not found. Please check your email.");
        } else if (error.response.status === 401) {
          toast.error("Password incorrect. Please try again.");
        } else {
          toast.error("Login failed. Please try again later.");
        }
      } else {
        toast.error("Login failed. Please try again later.");
      }
      console.error("Error:", error);
    }
  };

  return (

    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login page </h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </Form.Group>

          <Form.Group
            className="form-group place-position"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
        </Form>
        <div className="EndOfLink">
          Don't have an account?{" "}
          <Link to="/register" className="link-text">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Login;
