import { HttpClient } from "@angular/common/http";
import { DestroyRef, inject, Injectable } from "@angular/core";
import { firebaseConfig } from "../../app.config";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { AuthRes } from "./authRes.mode";

@Injectable({ providedIn: "root" })
export class AuthService {
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);
  apiKey = firebaseConfig.apiKey;

  userObj = new Subject<User>();

  signIn(username: string, password: string) {
    return this.httpClient
      .post<AuthRes>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        { email: username, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => {
          return throwError(() => "An error has occured");
        })
      )
      .pipe(
        tap((resData) => {
          this.handleUserAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  handleUserAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userObj.next(user);
  }
}
