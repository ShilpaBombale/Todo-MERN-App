//backend/models/Todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
