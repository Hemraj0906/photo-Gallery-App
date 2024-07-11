

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const SearchImages = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <Form className="d-flex gallery-search-form">
      <Form.Control
        type="text"
        placeholder="Search by tags..."
        value={query}
        onChange={handleInputChange}
        className="me-2 gallery-search-input"
      />
    </Form>
  );
};

export default SearchImages;
