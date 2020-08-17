import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SwalService } from '../../shared/swal.service';
import { ToastService } from '../../shared/toast.service';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public carregando: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
        private toast: ToastService,
        private swal: SwalService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])],
            senha: [null, Validators.compose([Validators.required])]
        });
    }

    onSubmit() {
        this.carregando = true;
        this.authService.login(this.form.value).pipe(take(1)).subscribe(response => {
            // console.log(response);
            if (response.success && response.ativado && response.usuario) {
                this.authService.procedimentoLogin(response.token, response.usuario);
            } else if (response.success && !response.usuario) {
                this.toast.show('info', 'Usuário não cadastrado.');
            } else if (response.success && !response.ativado) {
                this.swal
                    .showAtivacaoConta(response.message, 'Clique no botão "Reenviar E-mail de Ativação" e será enviado para ' + response.email_destino + '')
                    .then(_v => {
                        if (_v.value) this.reenviarAtivacao(response['usuario']);
                    });
            } else this.toast.show('error', response.message);
        }, erro => {
            console.error('Erro no login.', erro);
            this.carregando = false;
        }, () => this.carregando = false);
    }


    reenviarAtivacao(usuario) {
        this.carregando = true;
        this.authService.reenviarAtivacao(usuario)
            .pipe(take(1))
            .subscribe(response => {
                if (response.success) this.toast.show('success', response.message);
                else this.toast.show('error', response.message);
            }, null, () => this.carregando = false);
    }
}
