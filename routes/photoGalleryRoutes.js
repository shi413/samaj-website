const express = require("express");
const multer = require("multer");
const PhotoGallery = require("../models/PhotoGallery");
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// 📌 Add New Photo Gallery Entry (Multiple Images)
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const { heading } = req.body;
    const images = req.files.map((file) => file.path);

    const newGallery = new PhotoGallery({ heading, images });
    await newGallery.save();
    res.status(201).json({ message: "Gallery added successfully", newGallery });
  } catch (error) {
    res.status(500).json({ message: "Error adding gallery", error });
  }
});

// 📌 Get All Photo Galleries
router.get("/", async (req, res) => {
  try {
    const galleries = await PhotoGallery.find();
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching galleries", error });
  }
});

// 📌 Delete a Gallery by ID
// Delete PhotoGallery group by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedGroup = await PhotoGallery.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      return res.status(404).json({ message: "Gallery group not found" });
    }
    res.json({ message: "Gallery group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
