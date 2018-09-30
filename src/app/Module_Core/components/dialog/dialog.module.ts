import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DialogOkComponent } from './dialog-ok';
import { DialogYesNoComponent } from './dialog-yes-no';
import { DialogSelectComponent } from './dialog-select';
import { NgTranslateModule } from '../../translate.module';

@NgModule({
  imports: [
    CommonModule,
    NgTranslateModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [],
  declarations: [
    DialogOkComponent,
    DialogYesNoComponent,
    DialogSelectComponent
  ],
  entryComponents: [
    DialogOkComponent,
    DialogYesNoComponent,
    DialogSelectComponent
  ],
  providers: []
})
export class DialogModule {}
