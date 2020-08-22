import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: ['full.component.scss']
})
export class FullComponent implements OnDestroy {
    public mobileQuery: MediaQueryList;
    public green: boolean = false;
    public blue: boolean = false;
    public dark: boolean = false;
    public minisidebar: boolean = false;
    public boxed: boolean = false;
    public danger: boolean = false;
    public sidebarOpened: boolean = false;
    public colors: string[] = ['Default (Blue)', 'Red', 'Teal Green', 'Dark Blue'];
    public color: string = this.colors[0];
    public config: PerfectScrollbarConfigInterface = {};
    private _mobileQueryListener: () => void;

    constructor(
        public router: Router,
        public changeDetectorRef: ChangeDetectorRef,
        public media: MediaMatcher,
        public menuItems: MenuItems,
        private authService: AuthenticationService
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    changeDarkMode(evt: MatSlideToggleChange) {
        const checked: boolean = evt.checked;
        if (checked)
            this.green = this.blue = this.danger = false;
        this.dark = checked;
    }

    changeColor(evt: MatRadioChange) {
        const color: string = evt.value;

        if (color == 'Red') {
            this.green = this.blue = false;
            this.danger = true;
        } else if (color == 'Teal Green') {
            this.danger = this.blue = false;
            this.green = true;
        } else if (color == 'Dark Blue') {
            this.green = this.danger = false;
            this.blue = true;
        } else if (color == 'Default Blue') {
            this.danger = this.green = this.blue = false;
        }
    }
}
