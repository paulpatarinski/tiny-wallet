import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'card-name',
    templateUrl: 'card.name.html'
})

export class CardNameComponent {
    @Input() name: string;
    @Output() nameChange: EventEmitter<String> = new EventEmitter<String>();
}