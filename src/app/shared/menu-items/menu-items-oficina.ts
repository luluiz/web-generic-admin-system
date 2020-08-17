import { Injectable } from '@angular/core';
import { Menu } from "./menu-items";

const MENUITEMS: Menu[] = [
    { state: 'dashboards', name: 'Dashboard', type: 'link', icon: 'pie_chart' },
    { state: 'cadastros/usuarios', name: 'Usuários', type: 'link', icon: 'person', niveis: ['ADMIN', 'O_ADMIN', 'F_ADMIN'] },
    { state: 'cotacoes/criar', name: 'Nova Cotação', type: 'link', icon: 'add' },
    { state: 'cotacoes/minhas_cotacoes', name: 'Minhas Cotações', type: 'link', icon: 'list_alt' },
    { state: 'cotacoes/meus_pedidos', name: 'Meus Pedidos', type: 'link', icon: 'shopping_cart' },
    {
        state: 'relatorios', name: 'Relatórios', type: 'sub', icon: 'timeline',
        children: [
            { state: 'fornecedores_cotacao', name: 'Orçamento/Cotação', type: 'link' },
            { state: 'cotacoes_periodo', name: 'Cotação/Período', type: 'link' },
            { state: 'economia', name: 'Economia', type: 'link' },
        ]
    },
];

@Injectable()
export class MenuItemsOficina {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
