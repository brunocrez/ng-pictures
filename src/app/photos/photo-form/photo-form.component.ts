import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
    templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

    photoForm: FormGroup;
    file: File;
    preview: any;

    constructor(
        private formBuilder: FormBuilder,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm() {
        this.photoForm = this.formBuilder.group({
            file: ['', Validators.required],
            description: ['', Validators.maxLength(300)],
            allowComments: [true]
        })
    }

    submit() {
        const description = this.photoForm.get('description').value;
        const allowComments = this.photoForm.get('allowComments').value;

        this.photoService.upload(description, allowComments, this.file)
            .subscribe(() => {
                this.alertService.success('Successfully Uploaded!', true);
                this.router.navigate(['user', this.userService.getUserName()]);
            })
    }

    handleFile(file: File) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (event: any) => this.preview = event.target.result;
        reader.readAsDataURL(file);
    }

}