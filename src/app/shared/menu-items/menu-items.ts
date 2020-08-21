import { Injectable } from '@angular/core';
import { Menu } from "../models/menu.model";

const MENUITEMS: Menu[] = [
    {
        state: 'welcome',
        name: 'Welcome',
        type: 'link',
        icon: 'view_module'
    },
    {
        state: 'users',
        name: 'Users',
        type: 'link',
        icon: 'people'
    },
    {
        state: 'dashboards', name: 'Dashboards', type: 'sub', icon: 'dashboard',
        children: [
            { state: 'general', name: 'General', type: 'link' },
            { state: 'specific', name: 'Specific', type: 'link' },
        ]
    },
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
