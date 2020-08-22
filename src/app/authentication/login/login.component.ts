import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { IHttpResponse } from '../../shared/models/http-response.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ToastService } from '../../shared/services/toast.service';

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
        private toast: ToastService,
        private authService: AuthenticationService
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
        this.loading = true;
        this.authService
            .login(this.form.value)
            .pipe(take(1))
            .subscribe((response: IHttpResponse) => {
                if (response.success) {
                    this.authService.setToken(response.data.token);
                    this.router.navigate(['welcome']);
                    this.toast.show('success', response.message);
                } else {
                    this.toast.show('error', response.message);
                }
            }, null, () => this.loading = false);
    }
}
