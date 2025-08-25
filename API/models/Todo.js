import { v4 as uuidv4 } from 'uuid';

export class Todo {
  constructor({ text, completed = false, createdAt = new Date(), updatedAt = new Date() }) {
    this.id = uuidv4();
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromObject(obj) {
    const todo = new Todo({
      text: obj.text,
      completed: obj.completed,
      createdAt: new Date(obj.createdAt),
      updatedAt: new Date(obj.updatedAt)
    });
    todo.id = obj.id;
    return todo;
  }

  toJSON() {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  update({ text, completed }) {
    if (text !== undefined) this.text = text;
    if (completed !== undefined) this.completed = completed;
    this.updatedAt = new Date();
    return this;
  }
}

// In-memory storage for demonstration (replace with database in production)
export class TodoRepository {
  constructor() {
    this.todos = new Map();
  }

  getAll() {
    return Array.from(this.todos.values()).sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  getById(id) {
    return this.todos.get(id);
  }

  create(todoData) {
    const todo = new Todo(todoData);
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id, updateData) {
    const todo = this.todos.get(id);
    if (!todo) return null;
    
    todo.update(updateData);
    return todo;
  }

  delete(id) {
    const deleted = this.todos.has(id);
    this.todos.delete(id);
    return deleted;
  }

  deleteCompleted() {
    const completedTodos = Array.from(this.todos.values()).filter(todo => todo.completed);
    completedTodos.forEach(todo => this.todos.delete(todo.id));
    return completedTodos.length;
  }

  getStats() {
    const todos = Array.from(this.todos.values());
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      pending: todos.filter(todo => !todo.completed).length
    };
  }
}

// Export singleton instance
export const todoRepository = new TodoRepository();