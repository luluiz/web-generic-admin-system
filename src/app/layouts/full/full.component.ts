
import { MediaMatcher } from '@angular/cdk/layout';
import {
    ChangeDetectorRef,
    Component,
    OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AuthenticationService } from '../../shared/services/authentication.service';



/** @title Responsive sidenav */
@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: []
})
export class FullComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    dir = 'ltr';
    green = false;
    blue = false;
    dark = false;
    minisidebar = false;
    boxed = false;
    danger = false;
    showHide = false;
    url = '';
    sidebarOpened = false;
    status = false;

    public showSearch = false;

    public config: PerfectScrollbarConfigInterface = {};
    private _mobileQueryListener: () => void;

    clickEvent() {
        this.status = !this.status;
    }


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


    // Mini sidebar
}
