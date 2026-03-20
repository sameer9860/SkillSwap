const Booking = require("../models/Booking");
const Skill = require("../models/Skill");

// @desc Create a new booking
// @route POST /api/bookings
// @access Private (Student)
const createBooking = async (req, res) => {
  const { skillId, date } = req.body;

  try {
    const skill = await Skill.findById(skillId);

    if (!skill) {
      return res.status(404).json({ msg: "Skill not found" });
    }

    const booking = await Booking.create({
      student: req.user.id,
      mentor: skill.mentor,
      skill: skillId,
      date,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// @desc Get user bookings
// @route GET /api/bookings
// @access Private
const getUserBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === "student") {
      bookings = await Booking.find({ student: req.user.id })
        .populate("mentor", "name email")
        .populate("skill", "title description");
    } else if (req.user.role === "mentor") {
      bookings = await Booking.find({ mentor: req.user.id })
        .populate("student", "name email")
        .populate("skill", "title description");
    } else {
      bookings = await Booking.find()
        .populate("student", "name email")
        .populate("mentor", "name email")
        .populate("skill", "title description");
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
};
