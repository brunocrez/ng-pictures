import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

    photoForm: FormGroup;
    file: File;
    preview: any;
    percentProgress = 0;

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
            .pipe(finalize(() => {
                this.router.navigate(['user', this.userService.getUserName()]);
            }))
            .subscribe(
                (event: HttpEvent<any>) => {
                    if (event.type == HttpEventType.UploadProgress) {
                        this.percentProgress = Math.round(100 * event.loaded / event.total);
                    } else if (event.type == HttpEventType.Response) {
                        this.alertService.success('Successfully Uploaded!', true);
                    }
                },
                () => {
                    this.alertService.danger('Some error has occurred!');
                })
    }

    handleFile(file: File) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (event: any) => this.preview = event.target.result;
        reader.readAsDataURL(file);
    }

}