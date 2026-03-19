const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
