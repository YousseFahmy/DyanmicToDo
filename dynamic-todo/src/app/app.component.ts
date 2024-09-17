import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { InputFormComponent } from './todo/input-form/input-form.component';
import { ListColumnComponent } from "./todo/list-column/list-column.component";
import { TodoItemComponent } from "./todo/todo-item/todo-item.component";
import { TodoService } from './todo/todo.service';
import { FilterStatusPipe } from './todo/filterStatus.pipe';
import { SearchPipe } from "./todo/search.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputFormComponent, TodoItemComponent, ListColumnComponent, FilterStatusPipe, SearchPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'dynamic-todo';
  todoService = inject(TodoService);
  searchQuery = signal<string>("");
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.todoService.fetchItems().subscribe();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
