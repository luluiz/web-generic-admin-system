import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TextMaskModule } from "angular2-text-mask";
import { MaterialModule } from '../material-module';
import { LoadingComponent } from '../shared/loading/loading.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutes } from './authentication.routing';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from './token.interceptor';
import { ActivationComponent } from './activation/activation.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [
        ErrorComponent,
        ForgotComponent,
        LockscreenComponent,
        LoginComponent,
        RegisterComponent,
        ChangePasswordComponent,
        ActivationComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        JwtHelperService,
        TokenInterceptor,
        LoadingComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }
