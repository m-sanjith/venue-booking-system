const express = require("express");
const Booking = require("../models/Booking");
const Venue = require("../models/Venue");
const { verifyToken, requireAdmin, requireStudent } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, requireStudent, async (req, res) => {
  try {
    const { venueId, eventName, date, time, purpose } = req.body;

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ success: false, message: "Venue not found" });
    }

    if (venue.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Venue is not available for booking",
      });
    }

    const booking = await Booking.create({
      studentId: req.user.id,
      studentName: req.body.studentName,
      studentEmail: req.body.studentEmail,
      venueId: venue._id,
      venueName: venue.name,
      eventName,
      date,
      time,
      purpose,
      status: "Pending",
    });

    res.json({
      success: true,
      message: "Booking request submitted successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/my", verifyToken, requireStudent, async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id/status", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;