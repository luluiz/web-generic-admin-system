import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { take } from 'rxjs/operators';
import { ToastService } from '../../shared/toast.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    public form: FormGroup;
    public token: any;
    public validandoToken: boolean = false;
    public carregando: boolean = false;
    public tokenValido: boolean = true;
    public msg: string;
    public nome = new FormControl('', Validators.required);
    public password = new FormControl('', Validators.required);
    public confirmPassword = new FormControl('', CustomValidators.equalTo(this.password));

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toast: ToastService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.activatedRoute.params
            .pipe(take(1))
            .subscribe(params => {
                this.token = params['token'];
            });
        this.iniciarForms();
        this.validarToken();
    }

    iniciarForms() {
        this.form = this.fb.group({
            _id: null,
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            senha: this.password,
            nova_senha: this.confirmPassword
        });
    }

    validarToken() {
        this.validandoToken = true;

    }

    recuperarSenha(): void {
    }
}
