const Skill = require("../models/Skill");

// @desc Create a new skill
// @route POST /api/skills
// @access Private (Mentor)
const createSkill = async (req, res) => {
  const { title, description, category, price, duration } = req.body;

  try {
    const skill = await Skill.create({
      title,
      description,
      category,
      price,
      duration,
      mentor: req.user.id,
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// @desc Get all skills
// @route GET /api/skills
// @access Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("mentor", "name email");
    res.json(skills);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// @desc Get single skill
// @route GET /api/skills/:id
// @access Public
const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate("mentor", "name email");

    if (!skill) {
      return res.status(404).json({ msg: "Skill not found" });
    }

    res.json(skill);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkill,
};
