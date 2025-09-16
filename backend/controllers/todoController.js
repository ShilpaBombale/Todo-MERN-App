//backend/controllers/todoController.js

const Todo = require('../models/Todo');

// Get all todos for logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

// Create a todo
exports.createTodo = async (req, res) => {
  try {
    const { text, priority = 'Medium' } = req.body;
    const todo = await Todo.create({ user: req.user.id, text, priority });
    res.status(201).json(todo);
  } catch {
    res.status(500).json({ message: 'Error creating todo' });
  }
};


// Toggle completion
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $bit: { completed: { xor: 1 } } },
      { new: true }
    );
    res.json(todo);
  } catch {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Todo deleted' });
  } catch {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};
