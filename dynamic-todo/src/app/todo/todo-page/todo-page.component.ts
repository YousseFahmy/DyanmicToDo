import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { InputFormComponent } from "../input-form/input-form.component";
import { ListColumnComponent } from "../list-column/list-column.component";
import { FilterStatusPipe } from "../filterStatus.pipe";
import { SearchPipe } from "../search.pipe";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todo-page",
  standalone: true,
  imports: [
    InputFormComponent,
    ListColumnComponent,
    FilterStatusPipe,
    SearchPipe,
  ],
  templateUrl: "./todo-page.component.html",
  styleUrl: "./todo-page.component.css",
})
export class TodoPageComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  todoService = inject(TodoService);
  searchQuery = signal<string>("");

  ngOnInit(): void {
    const subscription = this.todoService.fetchItems().subscribe();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
