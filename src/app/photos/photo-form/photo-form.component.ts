import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

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
        private router: Router
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
            .subscribe(() => this.router.navigate(['']))
    }

    handleFile(file: File) {
        this.file = file;


        const reader = new FileReader();
        reader.onload = (event: any) => this.preview = event.target.result;
        reader.readAsDataURL(file);
    }

}