import { todoRepository } from '../models/Todo.js';

export const getAllTodos = (req, res) => {
  try {
    const todos = todoRepository.getAll();
    res.json({
      success: true,
      data: todos.map(todo => todo.toJSON())
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch todos',
      message: error.message
    });
  }
};

export const getTodoById = (req, res) => {
  try {
    const { id } = req.params;
    const todo = todoRepository.getById(id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
        message: `Todo with id ${id} does not exist`
      });
    }

    res.json({
      success: true,
      data: todo.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch todo',
      message: error.message
    });
  }
};

export const createTodo = (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Todo text is required'
      });
    }

    const todo = todoRepository.create({ text: text.trim() });

    res.status(201).json({
      success: true,
      data: todo.toJSON(),
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create todo',
      message: error.message
    });
  }
};

export const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    if (text !== undefined && text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Todo text cannot be empty'
      });
    }

    const updateData = {};
    if (text !== undefined) updateData.text = text.trim();
    if (completed !== undefined) updateData.completed = Boolean(completed);

    const todo = todoRepository.update(id, updateData);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
        message: `Todo with id ${id} does not exist`
      });
    }

    res.json({
      success: true,
      data: todo.toJSON(),
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update todo',
      message: error.message
    });
  }
};

export const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = todoRepository.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
        message: `Todo with id ${id} does not exist`
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete todo',
      message: error.message
    });
  }
};

export const deleteCompletedTodos = (req, res) => {
  try {
    const deletedCount = todoRepository.deleteCompleted();

    res.json({
      success: true,
      data: { deletedCount },
      message: `${deletedCount} completed todos deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete completed todos',
      message: error.message
    });
  }
};

export const getTodoStats = (req, res) => {
  try {
    const stats = todoRepository.getStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats',
      message: error.message
    });
  }
};