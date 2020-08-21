import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

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
    @Input() prefix: boolean = false;
    @Input() suffix: boolean = false;
    @Input() show_password: boolean = false;
    @Input() icon_prefix!: string;
    @Input() char_suffix!: string;
    @Input() hide_error: boolean = false;
    @Input() readonly: boolean = false;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() keyup: boolean = false;
    @Input() placeholder!: string;
    @Input() grid!: string;
    @Input() type!: string;
    @Input() step: number = 1;
    @Input() max!: number;
    @Input() min!: number;
    @Output() response = new EventEmitter();
    public control!: FormControl;
    public innerValue: any;
    private static readonly errorMessages: any = {
        required: () => 'Field is required.',
        equalTo: () => 'Passwords are not equal.',
        email: () => 'Invalid email.',
        min: (params: any) => 'Provide a value greater than or equal to ' + params.requiredMin + '.',
        max: (params: any) => 'Provide a value less than or equal to ' + params.requiredMax + '.',
        minlength: (params: any) => 'Must contain a minimum of ' + params.requiredLength + ' characters. ',
        maxlength: (params: any) => 'Must contain a maximum of ' + params.requiredLength + ' characters.',
        pattern: (params: any) => 'Invalid format.',
    };

    // Placeholders for the callbacks which are later provided by the Control Value Accessor
    private onTouchedCallback!: () => {};
    private onChangeCallback!: (_: any) => {};

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

    setType() {
        if (this.type == 'password') this.type = 'text';
        else if (this.type == 'text') this.type = 'password';
    }

    shouldShowErrors(): boolean {
        return !this.hide_error && <Boolean>this.control?.errors && (this.control?.dirty || this.control?.touched);
    }

    listOfErrors(): string[] {
        let errors: ValidationErrors | null = this.control?.errors;
        return Object.keys(<any>this.control.errors).map(field => this.getMessage(field, errors?.field));
    }

    private getMessage(type: string, params: any): string {
        return InputComponent.errorMessages[type](params);
    }
}
