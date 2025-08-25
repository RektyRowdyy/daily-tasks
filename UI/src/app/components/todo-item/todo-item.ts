import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo';

@Component({
  selector: 'app-todo-item',
  imports: [FormsModule, DatePipe],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItem {
  private todoService = inject(TodoService);
  
  todo = input.required<Todo>();
  
  protected isEditing = signal(false);
  protected editText = signal('');

  toggleComplete(): void {
    this.todoService.toggleTodo(this.todo().id);
  }

  onEditInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editText.set(target.value);
  }

  startEdit(): void {
    this.editText.set(this.todo().text);
    this.isEditing.set(true);
  }

  saveEdit(): void {
    const text = this.editText().trim();
    if (text) {
      this.todoService.updateTodo(this.todo().id, text);
    }
    this.isEditing.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editText.set('');
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo().id);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveEdit();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }
}
