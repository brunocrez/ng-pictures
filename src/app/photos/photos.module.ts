import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotosComponent } from './photo-list/photos/photos.component';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotoComponent,
    PhotosComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PhotosModule { }
