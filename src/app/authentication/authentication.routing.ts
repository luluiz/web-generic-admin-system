import { Routes } from '@angular/router';
import { ActivationComponent } from './activation/activation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '404',
                component: ErrorComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'lockscreen',
                component: LockscreenComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'change-password/:token',
                component: ChangePasswordComponent
            },
            {
                path: 'activation/:token',
                component: ActivationComponent
            }
        ]
    }
];
