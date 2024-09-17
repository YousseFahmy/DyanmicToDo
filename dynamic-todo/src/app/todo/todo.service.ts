import { Injectable, signal } from "@angular/core";
import { TodoItem } from "./todoItem.model";

@Injectable({ providedIn: "root" })
export class TodoService {
    private items = signal<TodoItem[]>([
        { text: 'ABCDE', isComplete: false, id: 1 },
        { text: 'ABC123', isComplete: true, id: 2 },
        { text: 'Task 3', isComplete: true, id: 3 },
        { text: 'My Task', isComplete: false, id: 4 },
        { text: 'Hello World', isComplete: false, id: 5 },
    ])

    public allItems = this.items.asReadonly()

    addItem(newItemText: string) {
        var newItem: TodoItem = {
            text: newItemText,
            id: Math.random(),
            isComplete: false
        }

        this.items.update(oldItems => {
            return [...oldItems, newItem];
        });
    }

    completeItem(itemId: number) {
        this.items.update(oldItems => {
            return oldItems.map(item => {
                if (item.id !== itemId) return item;
                return { ...item, isComplete: true };
            })
        })

    }
}