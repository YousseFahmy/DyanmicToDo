import { Component, DestroyRef, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth-form",
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./auth-form.component.html",
  styleUrl: "./auth-form.component.css",
})
export class AuthFormComponent {
  router = inject(Router);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  error: any = null;

  form = new FormGroup({
    username: new FormControl("", {
      validators: [Validators.required],
    }),
    password: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.value.username!;
      const password = this.form.value.password!;
      const authSub = this.authService.signIn(username, password).subscribe({
        next: () => {
          this.router.navigate(["todo", username]);
        },
        error: (errorRes) => {
          this.error = errorRes;
        },
      });

      this.destroyRef.onDestroy(() => authSub.unsubscribe());
    }
  }
}
