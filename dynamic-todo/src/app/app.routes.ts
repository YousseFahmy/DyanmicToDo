import { Routes } from "@angular/router";
import { AuthFormComponent } from "./todo/auth-form/auth-form.component";

export const routes: Routes = [
  { path: "", component: AuthFormComponent },
  {
    path: "todo/:username",
    loadComponent: () =>
      import("./todo/todo-page/todo-page.component").then(
        (module) => module.TodoPageComponent
      ),
  },
];
