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
  MainLPBCComponent, MainLVBCComponent, MainWIBCComponent, MainCCBCComponent,
  MainCDBCComponent, MainCEBCComponent
} from './Module_App/_Clients';
import {
  BookingService, ClubService, AccountService
} from './Module_App/_shared';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './Module_App/app.store';

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

    RouterModule.forRoot(AppRoutes),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([AppState])
  ],
  entryComponents: [
    MainLPBCComponent,
    MainLVBCComponent,
    MainWIBCComponent,
    MainCCBCComponent,
    MainCDBCComponent,
    MainCEBCComponent
  ],
  providers: [MetaService, BookingService, ClubService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
