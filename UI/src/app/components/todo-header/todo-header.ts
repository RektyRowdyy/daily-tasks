import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

@Component({
  selector: 'app-todo-header',
  imports: [ThemeSwitcher],
  templateUrl: './todo-header.html',
  styleUrl: './todo-header.css'
})
export class TodoHeader {
  private todoService = inject(TodoService);

  readonly completedCount = this.todoService.completedCount;
  readonly totalCount = this.todoService.totalCount;
}
