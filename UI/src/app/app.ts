import { Component, inject } from '@angular/core';
import { TodoHeader } from './components/todo-header/todo-header';
import { TodoInput } from './components/todo-input/todo-input';
import { TodoFilters } from './components/todo-filters/todo-filters';
import { TodoList } from './components/todo-list/todo-list';
import { PwaStatus } from './components/pwa-status/pwa-status';
import { ThemeService } from './services/theme';
import { PwaService } from './services/pwa';
import { TodoService } from './services/todo';

@Component({
  selector: 'app-root',
  imports: [TodoHeader, TodoInput, TodoFilters, TodoList, PwaStatus],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private themeService = inject(ThemeService);
  private pwaService = inject(PwaService);
  protected todoService = inject(TodoService);

  readonly isLoading = this.todoService.isLoading;
  readonly error = this.todoService.currentError;

  clearError(): void {
    this.todoService.clearError();
  }
}
