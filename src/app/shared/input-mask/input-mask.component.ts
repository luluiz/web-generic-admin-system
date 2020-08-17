import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input-mask',
    templateUrl: './input-mask.component.html',
    styleUrls: ['./input-mask.component.css'],
    styles: [':host { padding: 0 15px; }'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputMaskComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputMaskComponent), multi: true }
    ],
})
export class InputMaskComponent implements ControlValueAccessor {
    @Input() prefix: boolean;
    @Input() suffix: boolean;
    @Input() icon_prefix: string;
    @Input() char_suffix: string;
    @Input() cpf: boolean;
    @Input() cnpj: boolean;
    @Input() telefone: boolean;
    @Input() cep: boolean;
    @Input() chassi: boolean;
    @Input() ano: boolean;
    @Input() placa: boolean;
    @Input() erro: boolean;
    @Input() erroMsg: string;
    @Input() upperCase: boolean;
    @Input() readonly: boolean;
    @Input() disabled: boolean;
    @Input() required: boolean;
    @Input() placeholder: string;
    @Input() grid: string;
    @Input() type: string;
    @Input() step: number;
    @Input() min: number;
    @Output() response = new EventEmitter();

    public mask_cpf = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    public mask_cnpj = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/,];
    public mask_telefone = ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    public mask_cep = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];
    public mask_chassi = [/[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/, /[a-z,A-Z,0-9]/];
    public mask_placa = [/[a-z,A-Z]/, /[a-z,A-Z]/, /[a-z,A-Z]/, '-', /[0-9]/, /[a-z,A-Z,0-9]/, /[0-9]/, /[0-9]/];
    public mask_ano = [/[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    public innerValue: any;
    public control: FormControl;
    public hoje: Date = new Date();
    public ano_hoje = this.hoje.getFullYear();

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};

    //get accessor
    get value(): any {
        return this.getInnerValue();
    }

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    //Occured value changed from module
    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    onChange(value) {
        if (this.upperCase) this.innerValue = value.toUpperCase();
        else if (this.ano) this.innerValue = this.setAnoLimite(value);
        else this.innerValue = value;
        this.value = this.getInnerValue();
        this.onBlur();
    }

    setAnoLimite(ano: string): string {
        let _ano = Number(ano);
        if (!ano) return null;
        else if (_ano < 1950) return '1950';
        else if (_ano > this.ano_hoje) return (this.ano_hoje + 1).toString();
        else return ano;
    }

    onBlur() {
        this.onTouchedCallback();
        this.onChangeCallback(this.getInnerValue());
        this.response.emit(this.getInnerValue());
    }

    getMask() {
        if (this.cpf) return { guide: true, 'mask': this.mask_cpf };
        else if (this.cnpj) return { guide: true, 'mask': this.mask_cnpj };
        else if (this.telefone) return { guide: true, 'mask': this.mask_telefone };
        else if (this.cep) return { guide: true, 'mask': this.mask_cep };
        else if (this.chassi) return { guide: false, 'mask': this.mask_chassi };
        else if (this.ano) return { guide: false, 'mask': this.mask_ano };
        else if (this.placa) return { guide: false, 'mask': this.mask_placa };
    }

    getInnerValue() {
        if (this.upperCase) return this.innerValue ? this.innerValue.toUpperCase() : this.activeError();
        else if (this.ano) return this.innerValue ? this.setAnoLimite(this.innerValue) : this.activeError();
        else return this.innerValue ? this.innerValue : this.activeError();
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
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return InputMaskComponent.errorMessages[type](params);
    }
}
