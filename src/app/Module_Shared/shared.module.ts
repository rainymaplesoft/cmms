import { NgModule } from '@angular/core';
import { MetaService } from './meta.service';
import { SignUpComponent } from './SignUp';
import { ViewHeaderComponent } from './ViewHeader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule, NgTranslateModule } from '../Module_Core';
import { CoreModule } from '../Module_Core/core.module';
import { ModuleFirebase } from '../Module_Firebase';
import { CommonModule } from '@angular/common';
import { EventLatestComponent } from './Events';
import { PricingComponent } from './Pricing';
import { AccountListComponent, AccountEditComponent } from './Account';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule,
    // application level modules
    AppMaterialModule,
    CoreModule,
    ModuleFirebase,
    NgTranslateModule
  ],
  exports: [
    SignUpComponent,
    ViewHeaderComponent,
    EventLatestComponent,
    PricingComponent,
    AccountListComponent,
    AccountEditComponent
  ],
  declarations: [
    SignUpComponent,
    ViewHeaderComponent,
    PricingComponent,
    EventLatestComponent,
    AccountListComponent,
    AccountEditComponent
  ],
  providers: [MetaService]
})
export class SharedModule {}
