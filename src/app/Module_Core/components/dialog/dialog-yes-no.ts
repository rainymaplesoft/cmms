import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogConfirm } from '../../enums';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-yesno',
  template: `
    <div mat-dialog-title class='title'>
      <i class="material-icons icon">error_outline</i>
      <div class='title-content'>Confirm</div>
    </div>
    <div mat-dialog-content style='margin: 1em;'>{{message|translate}}</div>
    <div mat-dialog-actions style='display:flex;justify-content: center;'>
        <button mat-button (click)="dialogClose(yes)">Yes</button>
        <button mat-button (click)="dialogClose(no)">No</button>
    </div>
    `,
  styles: [
    `
      .title {
        display: flex;
      }
      button {
        margin: 0 0.3em;
      }
      .title-content {
        font-weight: bold;
        font-size: 1.1em;
        padding: 2px 2px;
      }
      .icon {
        color: tomato;
      }
    `
  ]
})
// tslint:disable-next-line:component-class-suffix
export class DialogYesNoComponent implements OnInit {
  yes = DialogConfirm.Yes;
  no = DialogConfirm.No;
  message = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.message = this.data['message'];
  }

  dialogClose(option: string) {
    this.dialogRef.close(option);
  }
}

/* usage:

    constructor(protected dialog: MdDialog) {
    }

    onCancel(callback: any) {
      console.log(this.booking._id);
      const msg = 'Do you really want to cancel this booking?';
      const dialogRef = this.dialog.open(DialogYesNoComponent, {
        data: { message: msg }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (
          result === DialogConfirm.Yes &&
          callback &&
          typeof callback === 'function'
        ) {
          callback();
        }
      });
    }
 */
