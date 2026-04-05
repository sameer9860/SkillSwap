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

// @desc Get all skills (search, filter, pagination)
// @route GET /api/skills
// @access Public
const getSkills = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const count = await Skill.countDocuments({ ...keyword, ...category });
    const skills = await Skill.find({ ...keyword, ...category })
      .populate("mentor", "name email")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({ skills, page, pages: Math.ceil(count / pageSize), total: count });
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
