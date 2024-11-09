// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'incomplete' },
});

module.exports = mongoose.model('Task', taskSchema);
