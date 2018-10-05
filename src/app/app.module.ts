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
import { MetaService } from './Module_App/meta.service';
import {
  MainLPBCComponent,
  MainLVBCComponent,
  MainWIBCComponent
} from './Module_App/_Clients';
import {
  BookingService,
  ClubService,
  AccountService
} from './Module_App/_shared';

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

    // DO NOT import any lazy-loading module here!!

    RouterModule.forRoot(AppRoutes)
  ],
  entryComponents: [MainLPBCComponent, MainLVBCComponent, MainWIBCComponent],
  providers: [MetaService, BookingService, ClubService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {}
