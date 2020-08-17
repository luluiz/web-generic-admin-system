import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-flat-button',
    templateUrl: './flat-button.component.html',
    styleUrls: ['./flat-button.component.css']
})
export class FlatButtonComponent {
    @Input() disabled: boolean = false;
    @Input() color: string;
    @Input() text: string;
    @Input() icon: string;
    @Output() public onclick: EventEmitter<MouseEvent> = new EventEmitter();

    constructor() { }

    onClick(event: MouseEvent) {
        // if (!this.disabled)
        event.stopPropagation();
        this.onclick.emit(event);
    }

    getStyle() {
        let style = { margin: '2px 6px' };

        if (!this.color) {
            style['border'] = '#009688';
            style['border-width'] = 'thin';
            style['border-style'] = 'solid';
        }

        return style;
    }

}
