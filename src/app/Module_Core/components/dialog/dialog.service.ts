import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DialogYesNoComponent } from './dialog-yes-no';
import { DialogOkComponent } from './dialog-ok';
import { DialogConfirm } from '../../enums';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }


  Ok(message, callback: any) {
    const dialogRef = this.dialog.open(DialogOkComponent, { data: message });
    dialogRef.afterClosed().subscribe(result => {
      if (result === DialogConfirm.Ok) {
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
    });
  }

  YesNo(message, callback: any) {
    const dialogRef = this.dialog.open(DialogYesNoComponent, { data: message });
    dialogRef.afterClosed().subscribe(result => {
      if (result === DialogConfirm.Yes && callback && typeof callback === 'function') {
        callback();
      }
    });
  }
}
