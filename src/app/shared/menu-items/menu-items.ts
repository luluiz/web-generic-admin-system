import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
    niveis?: string[];
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    subchildren?: SubChildren[];
    niveis?: string[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    niveis?: string[];
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
    acao?: string;
}

const MENUITEMS: Menu[] = [
    {
        state: 'dashboards',
        name: 'Dashboard',
        type: 'link',
        icon: 'pie_chart'
    },
    {
        state: 'compras', name: 'Compras', type: 'sub', icon: 'shopping_cart',
        children: [
            { state: 'pedidos', name: 'Pedidos de Compra', type: 'link' },
            { state: 'historico', name: 'Histórico', type: 'link' },
            { state: 'configuracoes', name: 'Configurações', type: 'link' },
            // { state: 'bloqueio_credito', name: 'Bloqueios/Créditos', type: 'link' },
        ]
    },
    {
        state: 'cadastros', name: 'Cadastros', type: 'sub', icon: 'folder',
        children: [
            { state: 'usuarios', name: 'Usuário', type: 'link' },
            { state: 'oficinas', name: 'Oficina', type: 'link' },
            { state: 'fornecedores', name: 'Fornecedor', type: 'link' },
            { state: 'fabricantes_segmentos', name: 'Fabricantes/Segmentos', type: 'link' },
            { state: 'marcas_modelos', name: 'Marcas/Modelos', type: 'link' },
        ]
    },
    {
        state: 'financeiro', name: 'Financeiro', type: 'sub', icon: 'attach_money',
        children: [
            { state: 'oficina', name: 'Oficina', type: 'link' },
            { state: 'fornecedor', name: 'Fornecedor', type: 'link' },
        ]
    },
    {
        state: 'relatorios', name: 'Relatórios', type: 'sub', icon: 'timeline',
        children: [
            { state: 'desempenho_fornecedor', name: 'Desempenho', type: 'link' },
            { state: 'vendas_fornecedor', name: 'Vendas / Fornecedor', type: 'link' },
        ]
    },
    {
        state: 'pagamentos', name: 'Pagamentos', type: 'sub', icon: 'receipt',
        children: [
            { state: 'comprovantes', name: 'Comprovantes', type: 'link' }
        ]
    }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
