import { inject, Injectable, signal } from "@angular/core";
import { TodoItem } from "./todoItem.model";
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  setDoc,
  doc,
} from "@angular/fire/firestore";
import { Observable, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class TodoService {
  private httpClient = inject(HttpClient);
  private items = signal<TodoItem[]>([]);
  public allItems = this.items.asReadonly();

  private firestore: Firestore = inject(Firestore);
  private todoCollection = collection(this.firestore, "todos");

  fetchItems() {
    // const fetchObs = this.httpClient
    //   .get(
    //     `https://firestore.googleapis.com/v1/projects/sumergetalentprogram/databases/(default)/documents`,
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "null",
    //         Auth: "Hello",
    //       },
    //     }
    //   )
    //   .pipe(tap(console.log));

    // return fetchObs;

    const fetchObservable = collectionData(this.todoCollection, {
      idField: "id",
    }) as Observable<TodoItem[]>;
    return fetchObservable.pipe(
      tap((fetchedItems) => {
        this.items.set(fetchedItems);
      })
    );
  }

  addItem(newItemText: string) {
    var newItem = {
      text: newItemText,
      isComplete: false,
    };

    addDoc(this.todoCollection, newItem);
  }

  completeItem(itemId: string) {
    this.items.update((oldItems) => {
      return oldItems.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, isComplete: true };
      });
    });

    const docRef = doc(this.todoCollection, itemId);
    setDoc(docRef, { isComplete: true }, { merge: true });
  }
}
