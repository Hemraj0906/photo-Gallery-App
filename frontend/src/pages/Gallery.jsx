// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SearchImages from "../components/SearchImages";
import ImageCard from "../components/ImageCard";
import "./Gallery.css"; 

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get("http://localhost:3000/api/photo", config);
      setImages(res.data);
      setFilteredImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Error fetching images");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredImages(images);
    } else {
      const filtered = images.filter((image) =>
        image.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredImages(filtered);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:3000/api/photo/${id}`, config);
      toast.success("Image deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image");
    }
  };

  return (
    <div className="container gallery-container">
      <div className="gallery-header">
        <SearchImages onSearch={handleSearch} className="gallery-search" />
        <Button
          as={NavLink}
          to="/add-image"
          variant="primary"
          className="gallery-button"
        >
          Add Image
        </Button>
      </div>
      <div className="gallery-row">
        {searchQuery !== "" && filteredImages.length === 0 ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <p>No images found for "{searchQuery}"</p>
        ) : (
          filteredImages.map((image) => (
            <div key={image._id} className="gallery-col">
              <ImageCard image={image} onDelete={handleDelete} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
