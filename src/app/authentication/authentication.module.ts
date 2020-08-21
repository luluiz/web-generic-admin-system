import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { ActivationComponent } from './activation/activation.component';
import { AuthenticationRoutes } from './authentication.routing';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterModule.forChild(AuthenticationRoutes),
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LockscreenComponent,
        ForgotPasswordComponent,
        ChangePasswordComponent,
        ErrorComponent,
        ActivationComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        TokenInterceptor,
        JwtHelperService
    ]
})
export class AuthenticationModule { }
