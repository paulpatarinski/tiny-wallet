import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'comment',
    templateUrl: 'comment.html'
})

export class CommentComponent {
    @Input() comment: string;
    @Output() commentChange: EventEmitter<String> = new EventEmitter<String>();
}