import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatButtonModule
} from '@angular/material';
import { NgTranslateModule } from './translate.module';
import {
  HttpService,
  StorageService,
  JwtAuthService,
  ToastrService,
  UtilService,
  LayoutService,
  AnimationModule,
  DialogModule,
  ValidatorService,
  ExceptionComponent,
  DialogService,
  ToggleComponent,
  SafeHtmlPipe,
  FilterOutPipe,
  FilterPipe,
  SpinnerComponent,
  ValMsgComponent
} from './export';

import { CommonModule } from '@angular/common';
import { PubSubService } from './services/pubsub.service';

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
  exports: [
    ToggleComponent,
    ExceptionComponent,
    SafeHtmlPipe,
    FilterOutPipe,
    FilterPipe,
    SpinnerComponent,
    ValMsgComponent
    // TranslatePipe
  ],
  declarations: [
    SafeHtmlPipe,
    FilterOutPipe,
    FilterPipe,
    ExceptionComponent,
    SpinnerComponent,
    ValMsgComponent
  ],
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
