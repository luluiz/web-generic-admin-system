import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
    selector: 'app-toast',
    template: `<toaster-container style="font-size: 14px" [toasterconfig]="config"></toaster-container>`
})

export class ToastComponent {
    public config: ToasterConfig = new ToasterConfig({
        animation: 'fade',
        mouseoverTimerStop: true,
        positionClass: 'toast-top-right'
    });
}