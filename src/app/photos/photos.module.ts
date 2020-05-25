import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PhotoListModule,
    PhotoModule
  ]
})
export class PhotosModule { }
