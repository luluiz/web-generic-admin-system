import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UtilsService } from '../services/utils.service';

let style = `
    :host { padding: 0 15px; }
    mat-form-field.sem_padding /deep/ .mat-form-field-wrapper /deep/ .mat-form-field-flex /deep/ .mat-form-field-infix {
        border: 0;
    }
`;

export const FORMAT_BR = {
    parse: {
        dateInput: 'D/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM Y',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM Y'
    },
};

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
    styles: [style],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatepickerComponent), multi: true },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: FORMAT_BR },
    ],
})

export class DatepickerComponent implements ControlValueAccessor {
    @Input() readonly: boolean;
    @Input() required: boolean;
    @Input() disabled: boolean;
    @Input() placeholder: string;
    @Input() erro: boolean;
    @Input() erroMsg: string;
    @Input() classe: string;
    @Output() response = new EventEmitter();
    public control: FormControl;
    public innerValue: Date = new Date();

    constructor(private utils: UtilsService) { }

    public mask = {
        guide: true,
        showMask: true,
        keepCharPositions: true,
        mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
    };

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};


    //get accessor
    get value(): Date {
        return this.getInnerValue();
    }

    //set accessor including call the onchange callback
    set value(v: Date) {
        if (v !== this.innerValue)
            this.innerValue = v;
    }

    //Occured value changed from module
    writeValue(v: any): void {
        if (v !== undefined) {
            this.value = v;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    onChange() {
        this.value = this.getInnerValue();
        this.onBlur();
    }

    toDate(value) {
        this.value = value;
        this.onBlur();
    }

    onBlur() {
        this.onTouchedCallback();
        this.onChangeCallback(this.getInnerValue());
        this.response.emit(this.getInnerValue());
    }

    getInnerValue() {
        return this.utils.isValidDate(this.innerValue) ? this.innerValue : this.activeError();
    }



    activeError() {
        if (this.required) this.erro = true;
        return null;
    }

    validate(c: FormControl) {
        this.control = c;
    }

    /**
    * ERRORS
    */
    private static readonly errorMessages = {
        required: () => 'Campo obrigatório.',
    };

    shouldShowErrors(): boolean {
        return this.control && this.control.errors && (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return DatepickerComponent.errorMessages[type](params);
    }
}