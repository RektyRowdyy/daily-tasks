import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoDto, TodoFilter, ApiResponse, TodoStats } from '../models/todo';
import { Observable, firstValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API_BASE_URL = 'http://localhost:3000/api';
  private readonly TODOS_ENDPOINT = `${this.API_BASE_URL}/todos`;
  
  private todos = signal<Todo[]>([]);
  private filter = signal<TodoFilter>('all');
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  readonly allTodos = this.todos.asReadonly();
  readonly currentFilter = this.filter.asReadonly();
  readonly isLoading = this.loading.asReadonly();
  readonly currentError = this.error.asReadonly();

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

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  private convertDtoToTodo(dto: TodoDto): Todo {
    return {
      ...dto,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt)
    };
  }

  private handleError(error: any): void {
    console.error('TodoService error:', error);
    this.error.set(error.error?.message || error.message || 'An error occurred');
    this.loading.set(false);
  }

  async loadTodos(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const response = await firstValueFrom(
        this.http.get<ApiResponse<TodoDto[]>>(this.TODOS_ENDPOINT)
      );
      
      if (response.success && response.data) {
        const todos = response.data.map(dto => this.convertDtoToTodo(dto));
        this.todos.set(todos);
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async addTodo(text: string): Promise<void> {
    if (!text.trim()) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.post<ApiResponse<TodoDto>>(this.TODOS_ENDPOINT, { text: text.trim() })
      );

      if (response.success && response.data) {
        const newTodo = this.convertDtoToTodo(response.data);
        this.todos.update(todos => [newTodo, ...todos]);
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async toggleTodo(id: string): Promise<void> {
    const todo = this.todos().find(t => t.id === id);
    if (!todo) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.put<ApiResponse<TodoDto>>(`${this.TODOS_ENDPOINT}/${id}`, {
          completed: !todo.completed
        })
      );

      if (response.success && response.data) {
        const updatedTodo = this.convertDtoToTodo(response.data);
        this.todos.update(todos =>
          todos.map(t => t.id === id ? updatedTodo : t)
        );
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async updateTodo(id: string, text: string): Promise<void> {
    if (!text.trim()) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.put<ApiResponse<TodoDto>>(`${this.TODOS_ENDPOINT}/${id}`, {
          text: text.trim()
        })
      );

      if (response.success && response.data) {
        const updatedTodo = this.convertDtoToTodo(response.data);
        this.todos.update(todos =>
          todos.map(t => t.id === id ? updatedTodo : t)
        );
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteTodo(id: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.delete<ApiResponse<any>>(`${this.TODOS_ENDPOINT}/${id}`)
      );

      if (response.success) {
        this.todos.update(todos => todos.filter(t => t.id !== id));
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteCompletedTodos(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.delete<ApiResponse<{ deletedCount: number }>>(`${this.TODOS_ENDPOINT}/completed/all`)
      );

      if (response.success) {
        this.todos.update(todos => todos.filter(t => !t.completed));
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async getStats(): Promise<TodoStats | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<ApiResponse<TodoStats>>(`${this.TODOS_ENDPOINT}/stats`)
      );

      return response.success && response.data ? response.data : null;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  setFilter(filter: TodoFilter): void {
    this.filter.set(filter);
  }

  clearError(): void {
    this.error.set(null);
  }
}
