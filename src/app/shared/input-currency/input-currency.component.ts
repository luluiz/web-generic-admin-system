import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from '../services/utils.service';

@Component({
    selector: 'app-input-currency',
    templateUrl: './input-currency.component.html',
    styleUrls: ['./input-currency.component.css'],
    styles: [':host { padding: 0 15px; }'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputCurrencyComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputCurrencyComponent), multi: true },
    ],
})
export class InputCurrencyComponent implements ControlValueAccessor {
    @Input() erro: boolean;
    @Input() erroMsg: string;
    @Input() readonly: boolean;
    @Input() disabled: boolean;
    @Input() required: boolean;
    @Input() keyup: boolean = true;
    @Input() placeholder: string;
    @Input() grid: string;
    @Input() type: string;
    @Input() align: string;
    @Output() response = new EventEmitter();
    public optionsMask = { prefix: 'R$ ', thousands: '.', decimal: ',', align: 'right' };
    public control: FormControl;
    public innerValue: any;
    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};

    constructor(private utils: UtilsService) { }

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue)
            this.innerValue = v;
    }

    //Occured value changed from module
    writeValue(value: any): void {
        if (value !== this.innerValue)
            this.innerValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    onChange(value) {
        // console.log('onChange', value, typeof value);
        try {
            value = this.utils.noMask(value);
        } catch (e) { }
        this.innerValue = value;
        this.value = this.innerValue
        this.onBlur();

    }

    onBlur() {
        // console.log('onBlur', this.innerValue);
        this.onTouchedCallback();
        this.onChangeCallback(Number(this.innerValue));
        this.response.emit(Number(this.innerValue));
    }

    getOptionMask() {
        return (this.align && this.align !== '') ? (this.optionsMask.align = this.align) : this.optionsMask;
    }


    validate(c: FormControl) {
        this.control = c;
    }

    /**
     * ERRORS
     */
    private static readonly errorMessages = {
        required: () => 'Campo obrigatório.',
        email: () => 'E-mail inválido',
        min: (params) => 'Forneça um valor maior ou igual a ' + params.requiredMin + '.',
        max: (params) => 'Forneça um valor menor ou igual a ' + params.requiredMax + '.',
        minlength: (params) => 'Deve conter no mínimo ' + params.requiredLength + ' caracteres. ',
        maxlength: (params) => 'Deve conter no máximo ' + params.requiredLength + ' caracteres.',
        pattern: (params) => 'O formato fornecido é inválido. ' + params.requiredPattern
    };

    shouldShowErrors(): boolean {
        return this.control && this.control.errors && (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return InputCurrencyComponent.errorMessages[type](params);
    }
}
