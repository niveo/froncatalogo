import { Component, Input } from "@angular/core";

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']
})
export class AlertComponent {

    @Input()
    tipo: 'info' | 'error' | 'warning' | 'success' = 'info'

 
}