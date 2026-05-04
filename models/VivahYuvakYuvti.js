const mongoose = require("mongoose");

const VivahSchema = new mongoose.Schema({
  candidateType: { type: String, enum: ["युवक", "युवती"] },
  specialCategory: {
    widower: { type: Boolean, default: false },
    widow: { type: Boolean, default: false },
    divyang: { type: Boolean, default: false },
    divorced: { type: Boolean, default: false },
  },
  fullName: { type: String },
  birthDetails: {
    date: { type: Date },
    hour: { type: Number },
    minute: { type: Number },
    ampm: { type: String, enum: ["AM", "PM"] },
  },
  birthPlace: {
    state: String,
    district: String,
    villageOrCity: String,
  },
  gotra: {
    self: { type: String },
    maternal: { type: String },
  },
  physicalDetails: {
    heightFeet: { type: Number },
    heightInches: { type: Number },
    weight: { type: Number },
    complexion: { type: String },
  },
  otherInfo: {
    rashi: String,
    nakshatra: String,
    nadi: String,
    charan: Number,
    manglik: { type: Boolean },
    shani: { type: Boolean },
    patrikaMatching: { type: Boolean },
  },
  education: { type: String },
  profession: { type: String },
  monthlyIncome: { type: Number },
  fatherDetails: {
    name: { type: String },
    occupation: { type: String },
    monthlyIncome: { type: Number },
  },
  currentAddress: {
    address: String,
    state: String,
    district: String,
    villageCity: String,
    pincode: String,
},
permanentAddress: {
    address: String,
    state: String,
    district: String,
    villageCity: String,
    pincode: String,
    sameAsCurrent: Boolean,
  },
  contact: {
    phone: String,
    mobile1: { type: String }
  },
  photo: { type: String },
  declaration: { type: Boolean },
});

const VivahYuvakYuvti = mongoose.model("VivahYuvakYuvti", VivahSchema);
module.exports = VivahYuvakYuvti;
