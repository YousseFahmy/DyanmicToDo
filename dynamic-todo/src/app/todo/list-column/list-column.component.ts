import { Component, input } from '@angular/core';
import { TodoItem } from '../todoItem.model';
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
  selector: 'app-list-column',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './list-column.component.html',
  styleUrl: './list-column.component.css',

})
export class ListColumnComponent {
  title = input.required<string>()
  items = input.required<TodoItem[]>()
}
