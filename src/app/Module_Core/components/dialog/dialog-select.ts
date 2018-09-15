import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISelection, DialogConfirm } from '../../enums';

export interface IDialogSelectParam {
  closeOption?: string;
  title: string;
  items: ISelection[];
  selectedIds: any[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-select',
  template: `
    <div class='selection-container'>
      <h2 mat-dialog-title>{{title|translate}}</h2>
      <div style='margin: 1em;flex:1;min-height:400px; max-height:600px; overflow-y:auto;'>
        <div style="padding: 0.2em 0;" *ngFor ='let c of selections'>
            <mat-checkbox [(ngModel)]='c.selected'>{{c.name|translate}}</mat-checkbox>
        </div>
      </div>
      <div mat-dialog-actions class='button_section'>
          <button mat-button (click)="dialogClose('yes')">{{"DIALOG.SAVE"|translate}}</button>
          <button mat-button (click)="dialogClose('no')">{{"DIALOG.CANCEL"|translate}}</button>
      </div>
    </div>
    `,
  styles: [
    `
      button {
        margin: 0 0.3em;
      }
      .selection-container {
        max-height: 70vh;
        min-width: 500px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
      }
      .button_section {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
      }
    `
  ]
})
export class DialogSelectComponent implements OnInit {
  title: string;
  dialogParam: IDialogSelectParam;
  items: ISelection[];
  selectedIds: any[];
  selections: ISelection[];

  constructor(
    public dialogRef: MatDialogRef<DialogSelectComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IDialogSelectParam
  ) {}

  ngOnInit() {
    this.dialogParam = this.data;
    this.items = this.dialogParam.items;
    this.title = this.dialogParam.title;
    this.selectedIds = this.dialogParam.selectedIds;
    this.createSelections();
  }

  createSelections = () => {
    this.selections = [];
    for (const item of this.items) {
      const selection: ISelection = {
        id: item.id,
        name: item.name,
        selected: false
      };
      for (const id of this.selectedIds) {
        if (selection.id === id) {
          selection.selected = true;
          break;
        }
      }
      this.selections.push(selection);
    }
  };

  dialogClose(option: string) {
    this.selectedIds = [];
    for (const selection of this.selections) {
      if (selection.selected) {
        this.selectedIds.push(selection.id);
      }
    }
    const result: IDialogSelectParam = {
      title: this.title,
      items: this.selections,
      selectedIds: this.selectedIds,
      closeOption: DialogConfirm.No
    };
    if (option === 'yes') {
      result.closeOption = DialogConfirm.Yes;
    }
    this.dialogRef.close(result);
  }
}
