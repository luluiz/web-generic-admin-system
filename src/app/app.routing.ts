import { Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { AppBlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboards/dashboard-oficina',
                pathMatch: 'full',
            },
            {
                path: 'dashboards',
                loadChildren: './dashboards/dashboards.module#DashboardsModule',
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
                canActivateChild: [AuthGuard]
            },
        ]
    },
    {
        path: '',
        component: AppBlankComponent,
        children: [
            {
                path: 'auth',
                loadChildren:
                    './authentication/authentication.module#AuthenticationModule'
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/404'
    }
];
