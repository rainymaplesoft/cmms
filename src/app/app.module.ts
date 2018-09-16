import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppMaterialModule,
  CoreModule,
  NgTranslateModule
} from './Module_Core';
import { RouterModule } from '@angular/router';
import { AppRoutes, AppComponents } from './app.route';
import { ModuleShared } from './Module_Shared/Shared.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: AppComponents,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // application level modules
    AppMaterialModule,
    CoreModule,
    ModuleShared,
    NgTranslateModule,
    // application feature modules
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
