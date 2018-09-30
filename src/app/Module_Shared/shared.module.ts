import { NgModule } from '@angular/core';
import { MetaService } from './meta.service';
import { SignUpComponent } from './SignUp';
import { ViewHeaderComponent } from './ViewHeader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule, NgTranslateModule } from '../Module_Core';
import { CoreModule } from '../Module_Core/core.module';
import { ModuleFirebase } from '../Module_Firebase';
import { CommonModule } from '@angular/common';

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
  exports: [SignUpComponent, ViewHeaderComponent],
  declarations: [SignUpComponent, ViewHeaderComponent],
  providers: [MetaService]
})
export class SharedModule {}