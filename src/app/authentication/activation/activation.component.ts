import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
    private token: any;
    public carregando: boolean = false;
    public tokenValido: boolean = true;
    public msg: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.activatedRoute.params
            .pipe(take(1))
            .subscribe(params => {
                this.token = params['token'];
            });
        this.validarToken();
    }

    validarToken() {
        this.carregando = true;
        this.authService.validarTokenAtivacao(this.token)
            .pipe(take(1))
            .subscribe(response => {
                // console.log('validarTokenAtivacao', response);
                if (response.success) this.tokenValido = true;
                else this.tokenValido = false;
                this.msg = response.message;

            }, null, () => this.carregando = false);
    }
}
