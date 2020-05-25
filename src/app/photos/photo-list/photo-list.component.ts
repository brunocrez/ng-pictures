import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  public photos: Photo[] = [];
  public filter = '';
  public currentPage: number = 1;
  public currentUser: string = '';
  public hasMore: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.photos = this.activatedRoute.snapshot.data['content'];
  }

  loadMore() {
    this.currentUser = this.activatedRoute.snapshot.params['userName'];
    this.photoService.listFromUserPaginated(this.currentUser, ++this.currentPage)
      .subscribe(entry => {
        this.filter = '';
        this.photos = this.photos.concat(entry);
        if (!entry.length) {
          this.hasMore = false;
        }
      })

  }

}
