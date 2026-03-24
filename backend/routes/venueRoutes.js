const express = require("express");
const Venue = require("../models/Venue");
const Booking = require("../models/Booking");
const { verifyToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 });
    res.json({ success: true, data: venues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { name, capacity, location, description, image } = req.body;

    const venue = await Venue.create({
      name,
      capacity,
      location,
      description,
      image,
    });

    res.json({
      success: true,
      message: "Venue added successfully",
      data: venue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id/status", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Venue status updated",
      data: venue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    await Booking.updateMany(
      { venueId: venue._id },
      {
        $set: {
          status: "Venue Removed",
          adminNote: "Venue was removed by admin",
        },
      }
    );

    await Venue.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Venue deleted successfully. Related bookings marked as Venue Removed.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;