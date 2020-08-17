import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from "../../shared/toast.service";
import { AuthenticationService } from "../authentication.service";

@Component({
    selector: 'app-lockscreen',
    templateUrl: './lockscreen.component.html',
    styleUrls: ['./lockscreen.component.scss']
})
export class LockscreenComponent implements OnInit {
    public carregando: boolean;
    public form: FormGroup;
    public usuarioLogado: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
        private toast: ToastService,
    ) { }

    ngOnInit() {
        this.iniciarForms();
    }

    iniciarForms() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])],
            senha: [null, Validators.compose([Validators.required])]
        });
    }


    onSubmit() {

    }
}
