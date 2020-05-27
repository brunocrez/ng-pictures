import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), lowerCaseValidator]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
        })
    }
}