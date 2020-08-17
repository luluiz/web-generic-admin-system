import { Routes } from '@angular/router';

export const DashboardsRoutes: Routes = [
    {
        path: '',
        children: [
            // {
            //     path: 'dashboard-admin',
            //     component: DashboardAdminComponent,
            //     canActivate: [RoutesGuard],
            //     canLoad: [RoutesGuard]
            // }
        ]
    }
];
