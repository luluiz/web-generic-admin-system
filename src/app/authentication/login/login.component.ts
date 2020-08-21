import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public form!: FormGroup;
    public loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        // private toast: ToastService,
        // private swal: SwalService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])]
        });
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    onSubmit() {

    }
}
