import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { MessageModule } from '../shared/components/message/message.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MessageModule
    ]
})
export class HomeModule { }