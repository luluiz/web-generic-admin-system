import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFileComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.css'],
    styles: [':host { padding: 0 15px; }'],
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
    ],
})
export class InputFileComponent {
    @Input() icon: string;
    @Input() erro: boolean;
    @Input() erroMsg: string;
    @Input() readonly: boolean;
    @Input() disabled: boolean;
    @Input() required: boolean;
    @Input() keyup: boolean;
    @Input() placeholder: string;
    @Output() response = new EventEmitter();

    public innerValue: any;

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    }

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    //Occured value changed from module
    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    onChange(value) {
        console.log('onChange', value);
        this.value = value;
        this.onBlur();
    }

    onBlur() {
        console.log('onBlur', this.innerValue);
        this.onChangeCallback(this.innerValue);
        this.response.emit(this.innerValue);
    }
}

