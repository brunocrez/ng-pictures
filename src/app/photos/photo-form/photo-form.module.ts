import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PhotoFormComponent } from './photo-form.component';
import { MessageModule } from '../../shared/components/message/message.module';

@NgModule({
    declarations: [PhotoFormComponent],
    imports: [
        CommonModule,
        MessageModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class PhotoFormModule { }