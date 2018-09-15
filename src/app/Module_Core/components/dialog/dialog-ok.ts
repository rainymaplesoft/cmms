import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogConfirm } from '../../enums';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dialog-ok',
    template: `
    <h2 mat-dialog-title>{{"DIALOG.TITLE_INFO"|translate}}</h2>
    <div mat-dialog-content style='margin: 1em;'>{{message|translate}}</div>
    <div mat-dialog-actions style='justify-content: center;'>
        <button mat-button (click)="closeDialog()">{{"DIALOG.OK"|translate}}</button>
    </div>
    `,
    styles: [
        `button{margin:0 .3em}`
    ]
})

// tslint:disable-next-line:component-class-suffix
export class DialogOkComponent implements OnInit {

    confirm_ok = DialogConfirm.Ok;
    message = '';
    constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.message = this.data;
    }

    closeDialog() {
        this.dialog.closeAll();
    }
}


/* usage:

    constructor(protected dialog: MdDialog) {
    }

    __onDelete(callback: any) {
        let dialogRef = this.dialog.open('message to show',DialogOk);
        dialogRef.afterClosed().subscribe(result => {
            if (result === Confirm.Ok) {
                if (callback && typeof callback == 'function') {
                    callback();
                }
            }
        });
    }
 */
