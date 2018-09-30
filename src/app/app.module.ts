import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule, NgTranslateModule } from './Module_Core';
import { CoreModule } from './Module_Core/core.module';
import { RouterModule } from '@angular/router';
import { AppRoutes, AppComponents } from './app.route';
import { AppComponent } from './app.component';
import { ModuleFirebase } from './Module_Firebase';
import { SharedModule } from './Module_Shared/shared.module';

@NgModule({
  declarations: AppComponents,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // application level modules
    AppMaterialModule,
    CoreModule,
    ModuleFirebase,
    NgTranslateModule,

    SharedModule,
    // DO NOT import any lazy-loading module here!!

    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
