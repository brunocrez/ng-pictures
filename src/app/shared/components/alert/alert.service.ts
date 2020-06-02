import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

import { Alert, AlertType } from './alert';

@Injectable({ providedIn: 'root' })
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepOnRouteChange = false;

    constructor(router: Router) {
        router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                if (this.keepOnRouteChange) {
                    this.keepOnRouteChange = false;
                } else {
                    this.clearEmit();
                }
            }
        })
    }

    success(message: string, keepOnRouteChange = false) {
        this.alert(AlertType.SUCCESS, message, keepOnRouteChange);
    }

    warning(message: string, keepOnRouteChange = false) {
        this.alert(AlertType.WARNING, message, keepOnRouteChange);
    }

    danger(message: string, keepOnRouteChange = false) {
        this.alert(AlertType.DANGER, message, keepOnRouteChange);
    }

    info(message: string, keepOnRouteChange = false) {
        this.alert(AlertType.INFO, message, keepOnRouteChange);
    }

    private alert(alertType: AlertType, message: string, keep: boolean) {
        this.keepOnRouteChange = keep;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert() {
        return this.alertSubject.asObservable();
    }

    clearEmit() {
        this.alertSubject.next(null);
    }

}