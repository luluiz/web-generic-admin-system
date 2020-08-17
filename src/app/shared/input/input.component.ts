import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    styles: [':host { padding: 0 15px; }'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputComponent), multi: true }
    ],
})
export class InputComponent implements ControlValueAccessor {
    @Input() prefix: boolean;
    @Input() suffix: boolean;
    @Input() show_password: boolean;
    @Input() icon_prefix: string;
    @Input() char_suffix: string;
    @Input() hide_error: boolean;
    @Input() readonly: boolean;
    @Input() disabled: boolean;
    @Input() required: boolean;
    @Input() keyup: boolean;
    @Input() placeholder: string;
    @Input() grid: string;
    @Input() type: string;
    @Input() step: number;
    @Input() max: number;
    @Input() min: number;
    @Output() response = new EventEmitter();
    public control: FormControl;
    public innerValue: any;

    // Placeholders for the callbacks which are later provided by the Control Value Accessor
    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    //Occured value changed from module
    writeValue(obj: any): void {
        this.value = obj;
        // if (obj) console.log(obj);
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    onChange(value: any) {
        // console.log('onChange', value);
        this.value = value;
        this.onBlur();
    }

    onBlur() {
        // console.log('onBlur', this.innerValue);
        this.onTouchedCallback();
        this.onChangeCallback(this.innerValue);
        this.response.emit(this.innerValue);
    }

    validate(c: FormControl) {
        this.control = c;
    }

    verSenha() {
        if (this.type == 'password') this.type = 'text';
        else if (this.type == 'text') this.type = 'password';
    }

    /**
     * ERRORS
     */
    private static readonly errorMessages = {
        required: () => 'Campo obrigatório.',
        equalTo: () => 'As senhas são diferentes.',
        email: () => 'E-mail inválido',
        min: (params) => 'Forneça um valor maior ou igual a ' + params.requiredMin + '.',
        max: (params) => 'Forneça um valor menor ou igual a ' + params.requiredMax + '.',
        minlength: (params) => 'Deve conter no mínimo ' + params.requiredLength + ' caracteres. ',
        maxlength: (params) => 'Deve conter no máximo ' + params.requiredLength + ' caracteres.',
        pattern: (params) => 'O formato fornecido é inválido.',
    };

    shouldShowErrors(): boolean {
        return !this.hide_error && this.control && this.control.errors && (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return InputComponent.errorMessages[type](params);
    }
}
