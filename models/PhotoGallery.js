const mongoose = require("mongoose");

const PhotoGallerySchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // Store image URLs or file paths
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PhotoGallery", PhotoGallerySchema);
