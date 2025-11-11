const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  picture: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },

  // Main type of entry (doctor, pharmacy, imageCenter)
  type: {
    type: String,
    enum: ["doctor", "pharmacy", "imageCenter"],
    required: true,
  },

  // For doctors only: primary or specialist
  doctorType: {
    type: String,
    enum: ["primary", "specialist"],
    required: function () {
      return this.type === "doctor";
    },
  },

  // Specialty (only required for specialist doctors)
  speciality: {
    type: String,
    trim: true,
    required: function () {
      return this.type === "doctor" && this.doctorType === "specialist";
    },
  },
}, { timestamps: true });

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;
