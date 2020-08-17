import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AuthGuard } from "./guards/auth.guard";
import { AppBlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MaterialModule } from './material-module';
import { UtilsService } from './shared/services/utils.service';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { SwalService } from './shared/swal.service';
import { ToastComponent } from './shared/toast.component';
import { ToastService } from './shared/toast.service';

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
        ToasterModule.forRoot(),
        DeviceDetectorModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                // whitelistedDomains: ["localhost:3003"],
                // blacklistedRoutes: ["example.com/examplebadroute/"]
            },
        }),
        RouterModule.forRoot(AppRoutes),
    ],
    declarations: [
        AppComponent,
        FullComponent,
        AppHeaderComponent,
        SpinnerComponent,
        AppBlankComponent,
        AppSidebarComponent,
        ToastComponent,
    ],
    providers: [
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: { suppressScrollX: true, wheelSpeed: 1, wheelPropagation: true } },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ToasterService,
        ToastService,
        SwalService,
        UtilsService,
        AuthGuard,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
