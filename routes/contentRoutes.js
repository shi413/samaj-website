import express from "express";
import multer from "multer";
import path from "path";
import Content from "../models/Content.js";

const router = express.Router();

// ✅ Ensure `uploads` folder exists
import fs from "fs";
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ POST route to add content
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file); // Debugging

    const { title, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !imagePath) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContent = new Content({ title, description, image: imagePath });
    await newContent.save();

    res.status(201).json({ message: "Content added successfully", newContent });
  } catch (error) {
    console.error("Error uploading content:", error);
    res.status(500).json({ message: "Failed to upload content" });
  }
});


router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Failed to fetch content" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Content.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
