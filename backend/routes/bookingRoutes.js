const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings } = require("../controllers/bookingController");
const { auth } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.route("/")
  .get(auth, getUserBookings)
  .post(auth, allowRoles("student"), createBooking);

module.exports = router;
