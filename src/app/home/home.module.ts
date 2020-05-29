import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { MessageModule } from '../shared/components/message/message.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        HomeComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MessageModule,
        HttpClientModule,
        RouterModule,
        FormsModule
    ]
})
export class HomeModule { }