import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class NotifyService {

    constructor(private _snackBar: MatSnackBar) { }

    error(msg: string) {
        this._snackBar.open(msg, 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 3000,
            panelClass: 'snackbar-error'
        })
    }

    info(msg: string) {
        this._snackBar.open(msg, 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 3000,
            panelClass: 'snackbar-info'
        })
    }

    warning(msg: string){
        this._snackBar.open(msg, 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 3000,
            panelClass: 'snackbar-warning'
        })
    }
}