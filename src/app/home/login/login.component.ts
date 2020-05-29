import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    @ViewChild('inputUserName', { static: false }) inputUserName: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) { }

    ngOnInit() {
        this.initializeForm();
        //this.platformDetectorService.isPlatformBrowser() && this.inputUserName.nativeElement.focus();
    }

    initializeForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    login() {
        const userName = this.loginForm.get('username').value
        const password = this.loginForm.get('password').value

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    this.router.navigate(['/user', userName])
                },
                error => {
                    console.error(error)
                    alert('invalid username or password')
                    this.platformDetectorService.isPlatformBrowser() && this.inputUserName.nativeElement.focus()
                    this.loginForm.reset()
                }
            )
    }

}