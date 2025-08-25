import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo';

@Component({
  selector: 'app-todo-input',
  imports: [FormsModule],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.css'
})
export class TodoInput {
  private todoService = inject(TodoService);
  
  protected newTodoText = signal('');

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newTodoText.set(target.value);
  }

  async onSubmit(): Promise<void> {
    const text = this.newTodoText().trim();
    if (text) {
      await this.todoService.addTodo(text);
      this.newTodoText.set('');
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}
