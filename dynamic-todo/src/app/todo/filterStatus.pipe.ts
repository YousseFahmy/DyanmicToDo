import { Pipe, PipeTransform } from "@angular/core";
import { TodoItem } from "./todoItem.model";

@Pipe({
    name: "status",
    standalone: true
})
export class FilterStatusPipe implements PipeTransform {
    transform(list: TodoItem[], filterComplete: boolean) {
        return list.filter(item => item.isComplete === filterComplete)
    }
}