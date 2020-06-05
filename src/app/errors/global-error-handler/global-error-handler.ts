import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

import * as StackTrace from 'stacktrace-js';
import { UserService } from '../../core/user/user.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: any) {
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const router = this.injector.get(Router)
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const message = error.message ? error.message : error.toString();

        router.navigate(['/error']);

        StackTrace
            .fromError(error)
            .then(frames => {
                const valuesAsString = frames
                    .map(item => item.toString())
                    .join('\n');

                console.log({ message, url, stackTrace: valuesAsString, user: userService.getUserName() })
            });
    }

}