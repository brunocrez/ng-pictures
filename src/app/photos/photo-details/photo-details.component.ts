import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.photoId = this.route.snapshot.params['photoId'];
        this.photo$ = this.photoService.findPhotoById(this.photoId);
    }

    deletePhoto() {
        this.photoService.removePhoto(this.photoId)
            .subscribe(() => this.router.navigate(['']));
    }

}