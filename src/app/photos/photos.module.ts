import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PhotoListModule,
    PhotoFormModule,
    PhotoModule,
    DarkenOnHoverModule,
    PhotoDetailsModule
  ]
})
export class PhotosModule { }
