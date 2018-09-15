import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogConfirm } from '../../enums';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-yesno',
  template: `
    <div mat-dialog-title class='title'>{{"DIALOG.TITLE_CONFIRM"|translate}}</div>
    <div mat-dialog-content style='margin: 1em;'>{{message|translate}}</div>
    <div mat-dialog-actions style='display:flex;justify-content: center;'>
        <button mat-button (click)="dialogClose(yes)">{{"DIALOG.YES"|translate}}</button>
        <button mat-button (click)="dialogClose(no)">{{"DIALOG.NO"|translate}}</button>
    </div>
    `,
  styles: [
    `button{margin:0 .3em}
    .title{font-weight: bold; font-size: 1.1em;}`
  ]
})
// tslint:disable-next-line:component-class-suffix
export class DialogYesNoComponent implements OnInit {
  yes = DialogConfirm.Yes;
  no = DialogConfirm.No;
  message = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.message = this.data;
  }

  dialogClose(option: string) {
    this.dialogRef.close(option);
  }
}

/* usage:

    constructor(protected dialog: MdDialog) {
    }

    __onDelete(callback: any) {
        let dialogRef = this.dialog.open('message to show',DialogYesNo);
        dialogRef.afterClosed().subscribe(result => {
            if (result === Confirm.Yes && callback && typeof callback == 'function') {
               callback();
            }
        });
    }
 */
