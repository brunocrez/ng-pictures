import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { RegisterService } from './register.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './register.component.html',
    providers: [UserNotTakenValidatorService]
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;
    @ViewChild('inputEmail', { static: false }) inputEmail: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private registerService: RegisterService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) { }

    ngOnInit() {
        this.initializeForm();
        //this.platformDetectorService.isPlatformBrowser() && this.inputEmail.nativeElement.focus();
    }

    initializeForm() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), lowerCaseValidator], this.userNotTakenValidatorService.checkIfTaken()],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
        })
    }

    register() {
        const newUser = this.registerForm.getRawValue() as NewUser;
        this.registerService.register(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.error(err)
            )
    }
}