import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { InputFormComponent } from "./todo/input-form/input-form.component";
import { ListColumnComponent } from "./todo/list-column/list-column.component";
import { TodoItemComponent } from "./todo/todo-item/todo-item.component";
import { TodoService } from "./todo/todo.service";
import { FilterStatusPipe } from "./todo/filterStatus.pipe";
import { SearchPipe } from "./todo/search.pipe";
import { AuthFormComponent } from "./todo/auth-form/auth-form.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    InputFormComponent,
    TodoItemComponent,
    ListColumnComponent,
    FilterStatusPipe,
    SearchPipe,
    AuthFormComponent,
    RouterOutlet,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "dynamic-todo";
}
