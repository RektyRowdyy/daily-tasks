import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo';
import { TodoFilter } from '../../models/todo';

@Component({
  selector: 'app-todo-filters',
  imports: [],
  templateUrl: './todo-filters.html',
  styleUrl: './todo-filters.css'
})
export class TodoFilters {
  private todoService = inject(TodoService);
  
  readonly currentFilter = this.todoService.currentFilter;

  setFilter(filter: TodoFilter): void {
    this.todoService.setFilter(filter);
  }
}
