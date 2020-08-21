import { Routes } from '@angular/router';
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';
import { DashboardSpecificComponent } from './dashboard-specific/dashboard-specific.component';

export const DashboardRoutes: Routes = [
    {
        path: 'general',
        component: DashboardGeneralComponent
    },
    {
        path: 'specific',
        component: DashboardSpecificComponent
    }
];
