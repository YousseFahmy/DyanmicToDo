import { inject, Injectable, signal } from "@angular/core";
import { TodoItem } from "./todoItem.model";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class TodoService {
    private items = signal<TodoItem[]>([]);
    public allItems = this.items.asReadonly();

    private firestore: Firestore = inject(Firestore);
    private todoCollection = collection(this.firestore, "todos");

    fetchItems() {
        const fetchObservable = collectionData(this.todoCollection, { idField: 'id' }) as Observable<TodoItem[]>;
        return fetchObservable.pipe(tap(fetchedItems => {
            this.items.set(fetchedItems);
        }));
    }

    addItem(newItemText: string) {
        var newItem: TodoItem | any = {
            text: newItemText,
            // id: Math.random(),
            isComplete: false
        };

        this.items.update(oldItems => {
            return [...oldItems, newItem];
        });
    }

    completeItem(itemId: string) {
        this.items.update(oldItems => {
            console.log(oldItems);
            return oldItems.map(item => {
                if (item.id !== itemId) return item;
                return { ...item, isComplete: true };
            });
        });

    }
};