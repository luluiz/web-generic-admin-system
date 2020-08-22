import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { IHttpResponse } from '../../shared/models/http-response.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SwalService } from '../../shared/services/swal.service';
import { ToastService } from '../../shared/services/toast.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public loading: boolean = false;
    public form!: FormGroup;
    public types: string[] = ['Admin', 'TypeA', 'TypeB'];

    constructor(
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private toast: ToastService,
        private swal: SwalService,
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            type: [null, Validators.compose([Validators.required])],
            name: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            password: [null, Validators.compose([Validators.required])],
            password_confirm: [null, Validators.compose([Validators.required])],
            terms: [false, Validators.requiredTrue],
        });

        this.form.valueChanges.subscribe(_v => {
            if (_v.password && _v.password_confirm && _v.password != _v.password_confirm) {
                this.form.get('password_confirm')?.setErrors({ equalTo: true });
            } else {
                let errors: any = this.form.get('password_confirm')?.errors;
                if (errors?.equalTo) {
                    delete errors.equalTo;
                    if (!errors.required) this.form.get('password_confirm')?.setErrors(null);
                    else this.form.get('password_confirm')?.setErrors(errors);
                }
            }
        });
    }

    get name() {
        return this.form.get('name');
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    get password_confirm() {
        return this.form.get('password_confirm');
    }

    onSubmit() {
        this.loading = true;
        this.authService
            .register(this.form.value)
            .pipe(take(1))
            .subscribe((response: IHttpResponse) => {
                console.log('register', response);
                if (response.success) {
                    this.swal.showOk('success', undefined, response.message);
                    this.form.reset();
                } else {
                    this.toast.show('error', response.message);
                }
            }, error => {
                console.error(error);
                this.loading = false;
            }, () => this.loading = false);
    }

}
