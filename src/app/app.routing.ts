import { Routes } from '@angular/router';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/',
                pathMatch: 'full'
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'dashboards',
                loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
            },
            {
                path: 'welcome',
                loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
            },
        ]
    },
    {
        path: '',
        component: AppBlankComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/404'
    }
];
