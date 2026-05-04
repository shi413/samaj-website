const mongoose = require("mongoose");

const VarshikTakanSchema = new mongoose.Schema({
  sno: { type: Number, required: true }, // ✅ Ensure it's required
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  year: { type: String, required: true }
});

module.exports = mongoose.model("VarshikTakan", VarshikTakanSchema);
