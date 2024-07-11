





const moment = require("moment");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Photo = require("../models/photoModel");
//const Photo = require("../models/photoModel");
const User = require("../models/userModel");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

exports.uploadPhoto = upload.single("photo");

exports.registerPhoto = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    const { name, tags } = req.body;
    const date = moment(new Date()).format("YYYY-MM-DD");

    const photo = new Photo({
      name: name,
      tags: tags,
      imgpath: uploadResult.secure_url,
      date: date,
      user: req.user._id,
    });

    await photo.save();
    res.status(200).json(photo);
  } catch (error) {
    console.error("Error in /registerPhoto route:", error);
    res.status(500).json({ error: error.message });
  }
};



exports.getPhotosByLoggedInUser = async (req, res) => {
  try {

    const userId = req.user._id;


    const photos = await Photo.find({ user: userId });


    res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching user photos:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deletePhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    if (photo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const result = await Photo.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Photo deleted successfully", data: result });
  } catch (error) {
    console.error("Error in /deletePhotoById route:", error);
    res.status(500).json({ error: error.message });
  }
};