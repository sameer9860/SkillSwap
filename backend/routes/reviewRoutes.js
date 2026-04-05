const express = require("express");
const router = express.Router();
const { createReview, getSkillReviews } = require("../controllers/reviewController");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, createReview);
router.get("/skill/:skillId", getSkillReviews);

module.exports = router;
