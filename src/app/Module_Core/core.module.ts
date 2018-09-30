import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatButtonModule
} from '@angular/material';
import { NgTranslateModule } from './translate.module';

import { CommonModule } from '@angular/common';

import {
  AnimationModule,
  HttpService,
  StorageService,
  JwtAuthService,
  ToastrService,
  UtilService,
  LayoutService,
  ValidatorService,
  DialogService,
  PubSubService
} from '.';
import { DeclarationComponents, ExportComponents } from './core.components';
import { DialogModule } from './components/dialog/dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DialogModule,
    AnimationModule,
    NgTranslateModule
  ],
  exports: ExportComponents,
  declarations: DeclarationComponents,
  entryComponents: [],
  providers: [
    HttpService,
    StorageService,
    JwtAuthService,
    ToastrService,
    UtilService,
    LayoutService,
    ValidatorService,
    DialogService,
    PubSubService
  ]
})
export class CoreModule {}
