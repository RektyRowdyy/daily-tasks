import express from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
  getTodoStats
} from '../controllers/todoController.js';

const router = express.Router();

// GET /api/todos - Get all todos
router.get('/', getAllTodos);

// GET /api/todos/stats - Get todo statistics
router.get('/stats', getTodoStats);

// DELETE /api/todos/completed/all - Delete all completed todos (must be before /:id)
router.delete('/completed/all', deleteCompletedTodos);

// GET /api/todos/:id - Get todo by ID
router.get('/:id', getTodoById);

// POST /api/todos - Create new todo
router.post('/', createTodo);

// PUT /api/todos/:id - Update todo
router.put('/:id', updateTodo);

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', deleteTodo);

export default router;