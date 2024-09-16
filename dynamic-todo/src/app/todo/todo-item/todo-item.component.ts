import { Component, inject, model, output } from '@angular/core';
import { TodoItem } from '../todoItem.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  todoService = inject(TodoService)
  item = model.required<TodoItem>();
  complete = output<number>();

  completeItem() {
    this.todoService.completeItem(this.item().id)
  }

}
