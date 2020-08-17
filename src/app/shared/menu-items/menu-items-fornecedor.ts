import { Injectable } from '@angular/core';
import { Menu } from "./menu-items";

const MENUITEMS: Menu[] = [
    { state: 'dashboards', name: 'Dashboard', type: 'link', icon: 'pie_chart' },
    { state: 'cadastros/usuarios', name: 'Usuários', type: 'link', icon: 'person', niveis: ['ADMIN', 'O_ADMIN', 'F_ADMIN'] },
    { state: 'orcamento/lista_tarefas', name: 'Lista de Tarefas', type: 'link', icon: 'list_alt' },
    { state: 'orcamento/pesquisa', name: 'Pesquisa', type: 'link', icon: 'search' },
    {
        state: 'relatorios', name: 'Relatórios', type: 'sub', icon: 'timeline',
        children: [
            { state: 'desempenho', name: 'Desempenho/Vendedor', type: 'link' },
        ]
    },
    { state: 'pagamentos/comissoes', name: 'Comissões', type: 'link', icon: 'bar_chart' },
];

@Injectable()
export class MenuItemsFornecedor {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
