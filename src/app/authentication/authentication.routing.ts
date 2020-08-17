import { Routes } from '@angular/router';
import { ActivationComponent } from './activation/activation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
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
                path: 'recuperar_senha',
                component: ForgotComponent
            },
            {
                path: 'bloqueio',
                component: LockscreenComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registrar',
                component: RegisterComponent
            },
            {
                path: 'alterar_senha/:token',
                component: ChangePasswordComponent
            },
            {
                path: 'ativacao/:token',
                component: ActivationComponent
            }
        ]
    }
];
