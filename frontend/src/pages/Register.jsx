



// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css"; 

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name ) {
      toast.error("Please fill the name field.");
      return;
    }
        
    if (!email ) {
      toast.error("Please fill in the email.");
      return;
    }
    if ( !password) {
      toast.error("Please fill the password fields.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      // toast.error("Registration failed!");
      if (error.response && error.response.status === 400) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h1 className="text-center mb-4">Sign Up</h1>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="padding-pos"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="padding-pos"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Pass</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="padding-pos"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="buttn-color">
                Register
              </Button>
            </Form>
            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
