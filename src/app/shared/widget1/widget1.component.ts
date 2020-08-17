import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-widget1',
    templateUrl: './widget1.component.html',
    styleUrls: ['./widget1.component.css']
})
export class Widget1Component implements OnInit, OnChanges {
    @Input() cor: string;
    @Input() valor: string | number;
    @Input() titulo: string;
    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.valor) this.valor = changes.valor.currentValue;
    }

    getCor() {
        return 'bg-' + this.cor;
    }

}
