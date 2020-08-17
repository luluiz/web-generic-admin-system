import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthenticationService } from "../../../authentication/authentication.service";
import { Menu, MenuItems } from '../../../shared/menu-items/menu-items';
import { MenuItemsFornecedor } from '../../../shared/menu-items/menu-items-fornecedor';
import { MenuItemsOficina } from '../../../shared/menu-items/menu-items-oficina';

interface ResponseSidebar {
    toggleSidebar: boolean
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class AppSidebarComponent implements OnDestroy, OnInit {
    @Output() response = new EventEmitter<ResponseSidebar>();
    private _mobileQueryListener: () => void;
    public config: PerfectScrollbarConfigInterface = {};
    public mobileQuery: MediaQueryList;
    public status: boolean = true;
    public itemSelect: number[] = [];
    public usuarioLogado: any;
    public menu: Menu[];
    public _usuario: any;
    public _empresa: any;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private authService: AuthenticationService,
        public menuItems: MenuItems,
        public menuItemsFornecedor: MenuItemsFornecedor,
        public menuItemsOficina: MenuItemsOficina,
        public router: Router,
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.getUsuarioLogado();
    }

    ngOnInit(): void {
        this.setUsuario();
        this.setEmpresa();
        this.setMenu();
    }

    setUsuario() {
        this.authService._usuario.subscribe(value => {
            if (!value || !value.nome) this._usuario = this.authService.getUsuarioLogado();
            else this._usuario = value;
        });
    }

    setEmpresa() {
        this.authService._empresa.subscribe(value => {
            if (!value || !value.nome_fantasia) this._empresa = this.authService.getEmpresa();
            else this._empresa = value;
        });
    }

    setMenu() {
        if (this._usuario.is_fornecedor) this.menu = this.menuItemsFornecedor.getMenuitem();
        else if (this._usuario.is_oficina) this.menu = this.canShow(this.menuItemsOficina.getMenuitem());
        else this.menu = this.menuItems.getMenuitem();
    }

    canShow(menu: Menu[]): Menu[] {
        let _menu: Menu[] = [];
        menu.forEach(it => {
            if (!it.niveis) _menu.push(it);
            else if (it.niveis && it.niveis.includes(this.usuarioLogado.nivel))
                _menu.push(it);
        });
        return _menu;
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    subclickEvent() {
        this.status = true;
    }

    getUsuarioLogado() {
        this.usuarioLogado = this.authService.getUsuarioLogado();
    }

    irPara(acao: string, item: string, subitem?: string): void {
        if (item.includes('/') && !subitem) {
            let splitter = item.split('/');
            item = splitter[0];
            subitem = splitter[1];
        }

        let endereco = ['/'];
        endereco.push(item);

        if (item == 'dashboards') endereco.push(this.goToDashboard());
        if (subitem) endereco.push(subitem);
        this.router.navigate(endereco);
        this.response.emit({ toggleSidebar: true });
    }

    goToDashboard(): string {
        if (this.authService.isAdmin() || this.authService.isSuporte()) return 'dashboard-admin';
        else if (this.authService.isUsuarioFornecedor()) return 'dashboard-fornecedor';
        else if (this.authService.isUsuarioOficina()) return 'dashboard-oficina';
    }
}
