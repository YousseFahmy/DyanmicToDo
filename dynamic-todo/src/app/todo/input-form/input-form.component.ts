import { Component, inject, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../todoItem.model';
import { TodoService } from '../todo.service';

@Component({
	selector: 'app-input-form',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './input-form.component.html',
	styleUrl: './input-form.component.css'
})

export class InputFormComponent {
	searchInput = model<string>("");
	todoInput = model<string>("");
	todoService = inject(TodoService)

	newItemEvent = output<string>();

	search() {
		console.dir(this.searchInput())
	}

	addItem() {
		this.todoService.addItem(this.todoInput())
		this.todoInput.set("")
	}


}
