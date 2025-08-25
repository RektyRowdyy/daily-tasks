import { Injectable, signal, computed, effect } from '@angular/core';
import { Todo, TodoFilter } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'daily-tasks-todos';
  
  private todos = signal<Todo[]>(this.loadTodosFromStorage());

  private filter = signal<TodoFilter>('all');

  readonly allTodos = this.todos.asReadonly();
  readonly currentFilter = this.filter.asReadonly();

  readonly filteredTodos = computed(() => {
    const todos = this.todos();
    const filter = this.filter();

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'done':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });

  readonly completedCount = computed(() => 
    this.todos().filter(todo => todo.completed).length
  );

  readonly totalCount = computed(() => this.todos().length);

  addTodo(text: string): void {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.update(todos => [...todos, newTodo]);
  }

  toggleTodo(id: string): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }

  updateTodo(id: string, text: string): void {
    if (!text.trim()) return;

    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, text: text.trim(), updatedAt: new Date() }
          : todo
      )
    );
  }

  deleteTodo(id: string): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  setFilter(filter: TodoFilter): void {
    this.filter.set(filter);
  }

  constructor() {
    // Auto-save todos to localStorage whenever they change
    effect(() => {
      const todos = this.todos();
      this.saveTodosToStorage(todos);
    });
  }

  private loadTodosFromStorage(): Todo[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
      }
    } catch (error) {
      console.warn('Failed to load todos from localStorage:', error);
    }
    
    // Return default todos if nothing in storage or error
    return [
      {
        id: '1',
        text: 'Office',
        completed: true,
        createdAt: new Date('2025-08-25'),
        updatedAt: new Date('2025-08-25')
      },
      {
        id: '2',
        text: 'Drink Whey',
        completed: false,
        createdAt: new Date('2025-08-25'),
        updatedAt: new Date('2025-08-25')
      },
      {
        id: '3',
        text: 'Drink Creatine',
        completed: false,
        createdAt: new Date('2025-08-25'),
        updatedAt: new Date('2025-08-25')
      },
      {
        id: '4',
        text: 'Gym: Arms',
        completed: false,
        createdAt: new Date('2025-08-25'),
        updatedAt: new Date('2025-08-25')
      }
    ];
  }

  private saveTodosToStorage(todos: Todo[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.warn('Failed to save todos to localStorage:', error);
    }
  }
}
