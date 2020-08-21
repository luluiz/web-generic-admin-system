import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TokenInterceptor } from '../authentication/token.interceptor';
import { DashboardRoutes } from '../dashboards/dashboards.routing';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';
import { DashboardSpecificComponent } from './dashboard-specific/dashboard-specific.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterModule.forChild(DashboardRoutes),
    ],
    declarations: [
        DashboardGeneralComponent,
        DashboardSpecificComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: { suppressScrollX: true, wheelSpeed: 1, wheelPropagation: true } },
        TokenInterceptor,
    ]
})
export class DashboardsModule { }
