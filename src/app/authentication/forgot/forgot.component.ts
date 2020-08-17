import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { SwalService } from '../../shared/swal.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    public form: FormGroup;
    public carregando: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private swal: SwalService,
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required, CustomValidators.email])]
        });
    }

    send() {

    }
}
