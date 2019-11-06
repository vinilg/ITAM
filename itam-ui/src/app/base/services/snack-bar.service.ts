import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { BaseModule } from '../base.module';

@Injectable({
    providedIn: BaseModule
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: any, action: any, className: any) {
        this.snackBar.open(message, action, {
            duration: 5000,
            panelClass: [className],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}