import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.photoId = this.route.snapshot.params['photoId'];
        this.photo$ = this.photoService.findPhotoById(this.photoId);
        this.photo$.subscribe(() => { }, error => {
            console.log(error);
            this.router.navigate(['not-found']);
        });
    }

    deletePhoto() {
        this.photoService.removePhoto(this.photoId)
            .subscribe(
                () => {
                    this.alertService.success('Photo has been removed!', true);
                    this.router.navigate(['user', this.userService.getUserName()], { replaceUrl: true })
                },
                error => {
                    this.alertService.warning('Sorry, we could not remove the photo!', true);
                    console.log(error);
                }
            );
    }

    likePhoto(photo: Photo) {
        this.photoService.likePhoto(photo.id)
            .subscribe(liked => {
                if (liked) {
                    this.photo$ = this.photoService.findPhotoById(photo.id);
                }
            })
    }

}