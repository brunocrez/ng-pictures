import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PhotosModule { }
