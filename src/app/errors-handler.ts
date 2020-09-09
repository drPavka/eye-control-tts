import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    private _snackRef: MatSnackBarRef<any> | undefined;

    constructor(private _zone: NgZone, private _snack: MatSnackBar) {

    }

    handleError(error: any): void {
        console.error(error);

        //added zone to prevent wrong positioning of snackbar in some cases
        this._zone.run(() => {
            this._snackRef = this._snack.open(error.message, 'Close', {
                duration: 5000, panelClass: 'snack-error'
            });
            const _ = this._snackRef.afterDismissed().subscribe(() => {

                _.unsubscribe();
            });
        })
    }

}
