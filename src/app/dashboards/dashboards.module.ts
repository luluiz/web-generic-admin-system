import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { DashboardsRoutes } from './dashboards.routing';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule.forChild(DashboardsRoutes),
        SharedModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
    ],
    providers: [
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: { suppressScrollX: true, wheelSpeed: 1, wheelPropagation: true, } },
        CurrencyPipe
    ]
})
export class DashboardsModule { }
