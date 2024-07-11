





// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './AddImage.css'

const AddImage = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [tag, setTag] = useState("");

  const navigate = useNavigate();

  const addUserData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", name);
    formData.append("tags", tag);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/photo/add",
        formData,
        config
      );

      if (res.status === 200) {
        toast.success("Image uploaded successfully!");
        navigate("/gallery");
      } else {
        toast.error("Error uploading image!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please authenticate");
        navigate("/login"); 
      } else {
        toast.error("Error uploading image!");
      }
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1
              className="text-center mb-4 bg"
              style={{
                backgroundColor: "aqua",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Upload your Img Here
            </h1>
            <Form onSubmit={addUserData}>
              <Form.Group className="fName" controlId="formBasicName">
                <Form.Label>Name::::</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="position"
                />
              </Form.Group>
              <Form.Group className="tags" controlId="formBasicTags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Enter tags"
                />
              </Form.Group>
              <Form.Group className="file-chnage" controlId="formBasicFile">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="button-colr">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImage;
