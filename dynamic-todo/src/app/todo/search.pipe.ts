import { Pipe, PipeTransform } from "@angular/core";
import { TodoItem } from "./todoItem.model";

@Pipe({ name: "search", standalone: true })
export class SearchPipe implements PipeTransform {
    transform(list: TodoItem[], query: string = "") {
        return list.filter(item => item.text.includes(query))
    }

}