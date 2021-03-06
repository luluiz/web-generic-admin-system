import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TokenInterceptor } from '../authentication/token.interceptor';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutes } from '../users/users.routing';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user/user.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterModule.forChild(UsersRoutes),
    ],
    declarations: [
        ListUsersComponent,
        UserComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: { suppressScrollX: true, wheelSpeed: 1, wheelPropagation: true } },
        TokenInterceptor,
    ]
})
export class UsersModule { }
