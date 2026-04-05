const express = require("express");
const router = express.Router();
const { register, login, me, updateUserProfile } = require("../controllers/authController");
const { auth } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.put("/profile", auth, updateUserProfile);

module.exports = router;
