const express = require("express");
const router = express.Router();
const GautamJayanti = require("../models/GautamJayanti");

// ✅ Get all Gautam Jayanti records (sorted by year)
router.get("/", async (req, res) => {
    try {
        const data = await GautamJayanti.find().sort({ year: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

// ✅ Add new Gautam Jayanti registration
router.post("/", async (req, res) => {
    const { sno, name, sankhiya, amount, date, year } = req.body;
  
    if (!sno || !name || !sankhiya || !amount || !date || !year) {
      return res.status(400).json({ message: "सभी फ़ील्ड आवश्यक हैं।" });
    }
  
    try {
      const existing = await GautamJayanti.findOne({ sno, year });
      if (existing) {
        return res.status(400).json({ message: "इस वर्ष के लिए यह क्रमांक पहले से मौजूद है।" });
      }
  
      const totalAmount = sankhiya * amount;
  
      const newEntry = new GautamJayanti({
        sno,
        name,
        sankhiya,
        amount,
        totalAmount,
        date,
        year,
      });
  
      await newEntry.save();
  
      // ✅ Return status and message clearly
      return res.status(201).json({ message: "डेटा सफलतापूर्वक जोड़ा गया!" });
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).json({ message: "सर्वर त्रुटि" });
    }
  });
  
  

// ✅ Update a record
router.put("/:id", async (req, res) => {
    try {
        const { sno, name, sankhiya, amount, totalAmount, date } = req.body;
        const updatedEntry = await GautamJayanti.findByIdAndUpdate(
            req.params.id,
            {
                sno,
                name,
                sankhiya,
                amount,
                totalAmount,
                date: new Date(date),
                year: new Date(date).getFullYear(), // Ensure year is updated
            },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.json({ message: "Entry updated successfully", updatedEntry });
    } catch (error) {
        res.status(400).json({ message: "Error updating entry", error });
    }
});

// ✅ Delete a record
router.delete("/:id", async (req, res) => {
    try {
        const deletedEntry = await GautamJayanti.findByIdAndDelete(req.params.id);

        if (!deletedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.json({ message: "Entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting entry", error });
    }
});

module.exports = router;
