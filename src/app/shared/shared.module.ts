import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TokenInterceptor } from '../authentication/token.interceptor';
import { MaterialModule } from '../material-module';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FlatButtonComponent } from './flat-button/flat-button.component';
import { InputCurrencyComponent } from './input-currency/input-currency.component';
import { InputFileComponent } from './input-file/input-file.component';
import { InputMaskComponent } from './input-mask/input-mask.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuItems } from './menu-items/menu-items';
import { MenuItemsFornecedor } from './menu-items/menu-items-fornecedor';
import { MenuItemsOficina } from './menu-items/menu-items-oficina';
import { PageTitlesComponent } from './page-titles/page-titles.component';
import { Widget1Component } from './widget1/widget1.component';
import { Widget2Component } from './widget2/widget2.component';
import { Widget3Component } from './widget3/widget3.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TextMaskModule,
        CurrencyMaskModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        NgxMaskModule.forRoot()
        // SatDatepickerModule,
        // SatNativeDateModule
    ],
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        LoadingComponent,
        InputComponent,
        InputCurrencyComponent,
        InputMaskComponent,
        InputFileComponent,
        FlatButtonComponent,
        DatepickerComponent,
        PageTitlesComponent,
        Widget1Component,
        Widget2Component,
        Widget3Component,
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        LoadingComponent,
        InputComponent,
        InputCurrencyComponent,
        InputMaskComponent,
        InputFileComponent,
        FlatButtonComponent,
        DatepickerComponent,
        PageTitlesComponent,
        Widget1Component,
        Widget2Component,
        Widget3Component,
    ],
    entryComponents: [
    ],
    providers: [
        MenuItems,
        MenuItemsFornecedor,
        MenuItemsOficina,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: { suppressScrollX: true, wheelSpeed: 1, wheelPropagation: true, } },
        TokenInterceptor,
        DatePipe
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
