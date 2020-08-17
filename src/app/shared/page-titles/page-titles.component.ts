import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-titles',
    templateUrl: './page-titles.component.html',
    styleUrls: ['./page-titles.component.css']
})
export class PageTitlesComponent implements OnInit {
    @Input() titulo: string;
    @Input() nivel1: string;
    @Input() nivel2: string;
    @Input() nivel3: string;

    constructor() { }

    ngOnInit() {
    }

    /**
     * get class
     * @param n nivel
     */
    ngClass(n: number): string[] | string | object {
        let ngClass = ['breadcrumb-item'];

        if (n == 3 && this.nivel3) ngClass.push('active');
        else if (n == 2 && this.nivel2 && !this.nivel3) ngClass.push('active');
        else if (n == 1 && this.nivel1 && !this.nivel2) ngClass.push('active');

        return ngClass;
    }

}
