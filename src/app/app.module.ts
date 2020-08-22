import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MaterialModule } from './material-module';
import { AuthenticationService } from './shared/services/authentication.service';
import { SwalService } from './shared/services/swal.service';
import { ToastService } from './shared/services/toast.service';
import { UtilsService } from './shared/services/utils.service';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

export function tokenGetter() {
    return sessionStorage.getItem("token");
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        SharedModule,
        DeviceDetectorModule.forRoot(),
        ToastrModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
        RouterModule.forRoot(AppRoutes)
    ],
    declarations: [
        AppComponent,
        FullComponent,
        AppHeaderComponent,
        AppBlankComponent,
        SpinnerComponent,
        AppSidebarComponent,
        AppBreadcrumbComponent
    ],
    providers: [
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
        AuthenticationService,
        UtilsService,
        ToastService,
        SwalService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
