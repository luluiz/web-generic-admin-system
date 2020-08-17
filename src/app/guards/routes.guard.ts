import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class RoutesGuard implements CanActivate, CanLoad {
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // console.log('canActivate state', state);
        // console.log('canActivate next', next);
        return this.hasPermissionToActive(next, state);
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        // console.log('canLoad  route', route)
        // console.log('canLoad  segments', segments)
        return true;
    }

    hasPermissionToActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        let is_fornecedor: boolean = this.authService.isUsuarioFornecedor();
        let is_oficina: boolean = this.authService.isUsuarioOficina();
        let is_admin: boolean = this.authService.isAdmin() || this.authService.isSuporte();

        if (is_fornecedor && this.isRouteFornecedor(url, next)) return true;
        else if (is_oficina && this.isRouteOficina(url, next)) return true;
        else if (is_admin && this.isRouteAdmin(url)) return true;
        else if (is_fornecedor && (url == '/dashboards/dashboard-admin' || url == '/dashboards/dashboard-oficina'))
            this.router.navigate(['dashboards/dashboard-fornecedor']);
        else if (is_oficina && (url == '/dashboards/dashboard-admin' || url == '/dashboards/dashboard-fornecedor'))
            this.router.navigate(['/dashboards/dashboard-oficina']);
        else if (is_admin && (url == '/dashboards/dashboard-oficina' || url == '/dashboards/dashboard-fornecedor'))
            this.router.navigate(['dashboards/dashboard-admin']);
        else {
            this.router.navigate(['404']);
            return true;
        }
    }

    isRouteFornecedor(url: string, next: ActivatedRouteSnapshot): boolean {
        const routes = [
            '/perfil/usuario',
            '/perfil/cadastro',
            '/dashboards/dashboard-fornecedor',
            '/cadastros/usuarios',
            '/orcamento/lista_tarefas',
            '/orcamento/pesquisa',
            '/relatorios/desempenho',
            'pedido/:id_pedido',    // next
            'pedido/nf/:id_pedido',     // next
            'orcar/:id_cotacao/:id_orcamento',    // next
        ]

        return routes.includes(url) ? true : routes.includes(next.routeConfig.path);
    }

    isRouteOficina(url: string, next: ActivatedRouteSnapshot): boolean {
        const routes = [
            '/perfil/usuario',
            '/perfil/cadastro',
            '/dashboards/dashboard-oficina',
            '/cadastros/usuarios',
            '/cotacoes/criar',
            '/cotacoes/minhas_cotacoes',
            '/cotacoes/meus_pedidos',
            'clonar/:id_cotacao',       // next
            'mapa_cotacao/:id_cotacao', // next
            'cotacao/:id_cotacao',      // next
            'pedido/:id_pedido',        // next
            'pedido/nf/:id_pedido',     // next
            '/relatorios/fornecedores_cotacao',
            '/relatorios/cotacoes_periodo',
            '/relatorios/economia',

        ];

        return routes.includes(url) ? true : routes.includes(next.routeConfig.path);
    }

    isRouteAdmin(url: string): boolean {
        const routes = [
            '/perfil/usuario',
            '/perfil/cadastro',
            '/dashboards/dashboard-admin',
            '/compras/pedidos',
            '/compras/historico',
            '/compras/configuracoes',
            '/cadastros/usuarios',
            '/cadastros/oficinas',
            '/cadastros/fornecedores',
            '/cadastros/fabricantes_segmentos',
            '/cadastros/marcas_modelos',
            '/financeiro/oficina',
            '/financeiro/fornecedor',
            '/relatorios/desempenho_fornecedor',
            '/relatorios/vendas_fornecedor',
        ];

        return routes.includes(url);
    }
}
