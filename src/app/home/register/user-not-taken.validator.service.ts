import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { RegisterService } from './register.service';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private registerService: RegisterService) { }

    checkIfTaken() {
        return (control: AbstractControl) => {
            return control.valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(username => this.registerService.checkUserTaken(username)))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first())
        }
    }

}