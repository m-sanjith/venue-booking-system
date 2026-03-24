const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Available", "Maintenance", "Closed"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);