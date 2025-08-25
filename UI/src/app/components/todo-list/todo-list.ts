import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  private todoService = inject(TodoService);
  
  readonly filteredTodos = this.todoService.filteredTodos;
  readonly completedCount = this.todoService.completedCount;
  readonly totalCount = this.todoService.totalCount;
}
