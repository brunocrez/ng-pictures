import { Component, Input, OnInit } from '@angular/core';

import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() time = 3000;
    alerts: Alert[] = [];

    constructor(
        private alertService: AlertService
    ) {
        this.getAlertFromService();
    }

    getAlertFromService() {
        this.alertService.getAlert()
            .subscribe(alert => {
                if (!alert) {
                    this.alerts = [];
                    return;
                } else {
                    this.alerts.push(alert);
                    setTimeout(() => this.removeAlert(alert), this.time);
                }
            })
    }

    removeAlert(deleteAlert: Alert) {
        this.alerts = this.alerts.filter(alert => alert != deleteAlert);
    }

    getAlertClass(alert: Alert) {
        if (!alert) return '';

        switch (alert.alertType) {
            case AlertType.SUCCESS:
                return 'alert alert-success';
            case AlertType.WARNING:
                return 'alert alert-warning';
            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
        }
    }
}