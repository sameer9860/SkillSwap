const express = require("express");
const router = express.Router();
const { createSkill, getSkills, getSkill } = require("../controllers/skillController");
const { auth } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.route("/")
  .get(getSkills)
  .post(auth, allowRoles("mentor"), createSkill);

router.route("/:id")
  .get(getSkill);

module.exports = router;
