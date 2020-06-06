import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('inputUserName', { static: false }) inputUserName: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => { this.fromUrl = params['fromUrl'] });
        this.initializeForm();
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
                    if (this.fromUrl) {
                        this.router.navigateByUrl(this.fromUrl);
                    } else {
                        this.router.navigate(['/user', userName])
                    }
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