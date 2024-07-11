const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  imgpath: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
