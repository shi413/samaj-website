const express = require("express");
const VivahYuvakYuvti = require("../models/VivahYuvakYuvti");

const router = express.Router();

const upload = require("../middleware/upload");

router.post("/", upload.single("photo"), async (req, res) => {
  try {
      console.log("Request Body:", req.body);

      const formData = {
          candidateType: req.body.candidateType,
          specialCategory: {
              widower: req.body["specialCategory.widower"] === "true",
              widow: req.body["specialCategory.widow"] === "true",
              divyang: req.body["specialCategory.divyang"] === "true",
              divorced: req.body["specialCategory.divorced"] === "true",
          },
          fullName: req.body.fullName,
          birthDetails: {
              date: req.body["birthDetails.date"],
              hour: req.body["birthDetails.hour"],
              minute: req.body["birthDetails.minute"],
              ampm: req.body["birthDetails.ampm"],
          },
          birthPlace: {
              state: req.body["birthPlace.state"],
              district: req.body["birthPlace.district"],
              villageOrCity: req.body["birthPlace.villageOrCity"],
          },
          gotra: {
              self: req.body["gotra.self"],
              maternal: req.body["gotra.maternal"],
          },
          physicalDetails: {
              heightFeet: req.body["physicalDetails.heightFeet"],
              heightInches: req.body["physicalDetails.heightInches"],
              weight: req.body["physicalDetails.weight"],
              complexion: req.body["physicalDetails.complexion"],
          },
          otherInfo: {
              rashi: req.body["otherInfo.rashi"],
              nakshatra: req.body["otherInfo.nakshatra"],
              nadi: req.body["otherInfo.nadi"],
              charan: req.body["otherInfo.charan"],
              manglik: req.body["otherInfo.manglik"] === "true" || req.body["otherInfo.manglik"] === "हाँ",
              shani: req.body["otherInfo.shani"] === "true" || req.body["otherInfo.shani"] === "हाँ",
              patrikaMatching: req.body["otherInfo.patrikaMatching"] === "true" || req.body["otherInfo.patrikaMatching"] === "हाँ",
          },
          education: req.body.education,
          profession: req.body.profession,
          monthlyIncome: req.body.monthlyIncome,
          fatherDetails: {
              name: req.body["fatherDetails.name"],
              occupation: req.body["fatherDetails.occupation"],
              monthlyIncome: req.body["fatherDetails.monthlyIncome"],
          },
          currentAddress: {
              address: req.body["currentAddress.address"],
              state: req.body["currentAddress.state"],
              district: req.body["currentAddress.district"],
              villageCity: req.body["currentAddress.villageCity"],
              pincode: req.body["currentAddress.pincode"],
          },
          permanentAddress: {
              address: req.body["permanentAddress.address"],
              state: req.body["permanentAddress.state"],
              district: req.body["permanentAddress.district"],
              villageCity: req.body["permanentAddress.villageCity"],
              pincode: req.body["permanentAddress.pincode"],
              sameAsCurrent: req.body["permanentAddress.sameAsCurrent"] === "true",
          },
          contact: {
              phone: req.body["contact.phone"],
              mobile1: req.body["contact.mobile1"]
          },
          photo: req.file.filename, // Store file name if uploaded
          declaration: req.body.declaration === "true",
      };

      console.log("Processed Form Data:", formData);

      // Save to MongoDB
      const newVivahEntry = new VivahYuvakYuvti(formData);
      await newVivahEntry.save();

      res.status(201).json({ message: "Form submitted successfully!", data: newVivahEntry });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error", error });
  }
});
/**
 * 📌 GET: Fetch all registered candidates
 */
router.get("/", async (req, res) => {
  try {
    const data = await VivahYuvakYuvti.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("🚨 Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

/**
 * 📌 GET: Fetch a specific candidate by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const candidate = await VivahYuvakYuvti.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error("🚨 Error fetching candidate:", error);
    res.status(500).json({ message: "Error fetching candidate", error: error.message });
  }
});

module.exports = router;
