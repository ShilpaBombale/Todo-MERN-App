//backend/routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.patch('/:id', todoController.toggleTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
