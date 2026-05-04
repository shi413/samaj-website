import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; // Ensure this is the correct model path

const router = express.Router();

// Register Admin (Only for initial setup)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin exists
    let admin = await Admin.findOne({ username });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new admin
    admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if admin exists
      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(400).json({ message: "Invalid credentials" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate JWT token
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;
