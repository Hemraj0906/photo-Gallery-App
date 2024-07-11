

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ImageCard = ({ image, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(image._id);
  };

  return (
    <Card>
      <Card.Img variant="top" src={image.imgpath} className="card-img-top" />
      <Card.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <div>
            <Card.Title>{image.name}</Card.Title>
            <Card.Text>Tags: {image.tags.join(", ")}</Card.Text>
          </div> */}
          <Button
            variant="danger"
            onClick={handleDeleteClick}
            style={{
              backgroundColor: "red",
              color: "white",
              width: "100px",
              height: "100%",
              marginRight: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
