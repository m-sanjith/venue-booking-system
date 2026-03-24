const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    venueName: { type: String, required: true },
    eventName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    purpose: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Venue Removed"],
      default: "Pending",
    },
    adminNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);