import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { AuthenticationService } from "../../authentication/authentication.service";
import { MenuItems } from '../../shared/menu-items/menu-items';
import { UtilsService } from '../../shared/services/utils.service';

/** @title Responsive sidenav */
@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: ['full.component.css']
})
export class FullComponent implements OnDestroy, OnInit {
    @ViewChild('snav', { static: true }) public sidebarNav: MatSidenav;
    @ViewChild('end', { static: true }) public cfgNav: MatSidenav;
    public mobileQuery: MediaQueryList;
    public minisidebar: boolean;
    public sidebarOpened;
    public form: FormGroup;
    public config: PerfectScrollbarConfigInterface = {};
    private _mobileQueryListener: () => void;
    public usuario_autorizado: boolean;
    public usuario_logado: any = this.authService.getUsuarioLogado();
    public is_desktop: boolean = this.utils.isDesktop();
    public mostrarAlertaPagamento: boolean = false;
    private checarPagamentoSub: Subscription;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public menuItems: MenuItems,
        private authService: AuthenticationService,
        private utils: UtilsService,
    ) {
        this.mobileQuery = this.media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.iniciarForms();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.checarPagamentoSub.unsubscribe();
    }

    iniciarForms() {
    }

    logout() {
        this.authService.logout();
    }

    responseSidebar(evt: any) {
        if (!this.is_desktop && evt && evt.toggleSidebar)
            this.sidebarNav.toggle();
    }
}
