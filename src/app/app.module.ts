import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppMaterialModule,
  CoreModule,
  NgTranslateModule
} from './Module_Core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.route';
import { ModuleShared } from './Module_Shared/Shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
