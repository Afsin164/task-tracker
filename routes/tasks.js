const express = require('express');
const auth = require('../routes/auth');
const Task = require('../models/Task');
const router = express.Router();

// Create task
router.post('/', auth, async (req, res) => {
  const { title, description, projectId } = req.body;
  const task = new Task({ title, description, projectId });
  await task.save();
  res.json(task);
});

// Get all tasks for a project
router.get('/:projectId', auth, async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
});

router.put('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(task);
  });

  // Add this route
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        completedAt: req.body.status === 'Completed' ? new Date() : null 
      },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;