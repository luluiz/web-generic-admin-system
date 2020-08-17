import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-spinner',
    template: `<div class="preloader" *ngIf="isSpinnerVisible || carregando">
        <div class="spinner">
          <div class="double-bounce1" style="background: #20b14a"></div>
          <div class="double-bounce2"  style="background: #20b14a"></div>
        </div>
    </div>`,
    encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible = true;

    @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';
    @Input() carregando: boolean;

    constructor(
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.isSpinnerVisible = true;
            } else if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.isSpinnerVisible = false;
            }
        }, () => {
            this.isSpinnerVisible = false;
        });
    }

    ngOnDestroy(): void {
        this.isSpinnerVisible = false;
        this.carregando = false;
    }
}
