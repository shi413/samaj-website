import express from "express";
import VarshikTakan from "../models/VarshikTakan.js";

const router = express.Router();

// ✅ Create Entry
router.post("/", async (req, res) => {
  try {
    const { sno, name, date, amount, year } = req.body;

    const newEntry = new VarshikTakan({ sno, name, date, amount, year });
    await newEntry.save();

    res.status(201).json({ message: "डेटा सफलतापूर्वक जोड़ा गया!" });
  } catch (err) {
    console.error("Error in POST /varshik-takan:", err.message);
    res.status(500).json({ message: "सर्वर त्रुटि।" });
  }
});


// ✅ Get All Entries
router.get("/", async (req, res) => {
  try {
    const entries = await VarshikTakan.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// ✅ Update Entry
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await VarshikTakan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Error updating entry", error });
  }
});

// ✅ Delete Entry
router.delete("/:id", async (req, res) => {
  try {
    await VarshikTakan.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting entry", error });
  }
});

export default router;
