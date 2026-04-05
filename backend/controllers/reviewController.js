const Review = require("../models/Review");
const Booking = require("../models/Booking");

// @desc Create a new review
// @route POST /api/reviews
// @access Private
const createReview = async (req, res) => {
  const { skillId, rating, comment } = req.body;

  try {
    // Check if the user has booked this skill before allowing review
    const booking = await Booking.findOne({
      student: req.user.id,
      skill: skillId,
      // status: "completed", // Optionally, only allow reviews for completed sessions
    });

    if (!booking) {
      return res.status(403).json({ msg: "You can only review skills you have booked" });
    }

    const review = await Review.create({
      user: req.user.id,
      skill: skillId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// @desc Get reviews for a skill
// @route GET /api/reviews/skill/:skillId
// @access Public
const getSkillReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ skill: req.params.skillId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  createReview,
  getSkillReviews,
};
