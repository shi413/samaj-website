const mongoose = require("mongoose");

const GautamJayantiSchema = new mongoose.Schema({
    sno: { type: Number, required: true },
    name: { type: String, required: true },
    sankhiya: { type: Number, required: true },
    amount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, required: true },
    year: { type: Number, required: true }, // Added year field
});

module.exports = mongoose.model("GautamJayanti", GautamJayantiSchema);
