import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { TokenInterceptor } from "../authentication/token.interceptor";
import { MaterialModule } from '../material-module';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { InputCurrencyComponent } from './components/input-currency/input-currency.component';
import { InputMaskComponent } from './components/input-mask/input-mask.component';
import { InputComponent } from './components/input/input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuItems } from './menu-items/menu-items';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        TextMaskModule
    ],
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        InputComponent,
        InputCurrencyComponent,
        InputMaskComponent,
        LoadingComponent,
        DatepickerComponent
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        InputComponent,
        InputCurrencyComponent,
        InputMaskComponent,
        LoadingComponent,
        DatepickerComponent
    ],
    providers: [
        MenuItems,
        TokenInterceptor,
    ]
})
export class SharedModule { }
