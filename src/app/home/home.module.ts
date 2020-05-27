import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MessageModule } from '../shared/components/message/message.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MessageModule,
        RouterModule,
        FormsModule
    ]
})
export class HomeModule { }