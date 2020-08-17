import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SwalService } from '../../shared/swal.service';
import { ToastService } from "../../shared/toast.service";
import { AuthenticationService } from '../authentication.service';

const senha = new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,30}$/)]));
const confirmarSenha = new FormControl('', CustomValidators.equalTo(senha));

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public carregando: boolean;
    public form: FormGroup;
    public modalidades: string[] = ['Fornecedor', 'Oficina'];
    public mask_cnpj = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/,];

    constructor(
        private fb: FormBuilder,
        private toast: ToastService,
        private swal: SwalService,
        private authService: AuthenticationService,
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            modalidade: [null, Validators.compose([Validators.required])],
            cnpj: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            senha: senha,
            confirmarSenha: confirmarSenha,
            checkTermos: [false, Validators.requiredTrue],
        });
    }

    get email() {
        return this.form.get('email');
    }

    get senha() {
        return this.form.get('senha');
    }


}
