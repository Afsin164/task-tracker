const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' }, // e.g., Pending/Completed
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Link to Project
});

module.exports = mongoose.model('Task', TaskSchema);