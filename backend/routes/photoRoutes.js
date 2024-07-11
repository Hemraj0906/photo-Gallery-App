const express = require("express");
const {
  getAllPhotos,
  deletePhotoById,
  registerPhoto,
  uploadPhoto,
  getPhotosByLoggedInUser,
} = require("../controllers/photoController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Add photo
router.post("/add", auth, uploadPhoto, registerPhoto);

// Get all photos
router.get("/", auth, getPhotosByLoggedInUser);

// Delete a photo by ID
router.delete("/:id", auth, deletePhotoById);

module.exports = router;
