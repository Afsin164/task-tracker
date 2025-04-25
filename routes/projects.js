const express = require('express');
const auth = require('../routes/auth'); // JWT check
const Project = require('../models/Project');
const router = express.Router();

// Create a project (max 4 per user)
router.post('/', auth, async (req, res) => {
  try {
    const count = await Project.countDocuments({ userId: req.userId });
    if (count >= 4) return res.status(400).json({ msg: 'Max 4 projects allowed' });

    const project = new Project({ title: req.body.title, userId: req.userId });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all user projects
router.get('/', auth, async (req, res) => {
  const projects = await Project.find({ userId: req.userId });
  res.json(projects);
});

module.exports = router;