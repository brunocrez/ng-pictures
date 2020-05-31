import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
    selector: 'app-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.initForm();
    }

    initForm() {
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })
    }

    submitForm() {
        const comment = this.commentForm.get('comment').value as string;
        this.photoService.addComment(this.photoId, comment)
            .subscribe(() => {
                this.commentForm.reset();
                alert('Sucesso!');
            })
    }

}