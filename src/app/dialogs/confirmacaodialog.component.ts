import { Component, Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class ConfirmacaoDialogService {
    constructor(private dialog: MatDialog) { }

    open() {
        return this.dialog.open(ConfirmacaoDialogComponent, {
            width: '300px'
        });
    }
}

@Component({
    selector: 'confirmacaodialog-component',
    templateUrl: 'confirmacaodialog.component.html'
})
export class ConfirmacaoDialogComponent {
    constructor(public dialogRef: MatDialogRef<boolean>) { }

    onClose(type: number) {
        this.dialogRef.close(type === 1);
    }
}