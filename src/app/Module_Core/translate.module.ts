import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
  TranslatePipe,
  TranslateStore
} from '@ngx-translate/core';

import { LocalJsonTransLoaderFactory, HttpLoaderFactory } from './translation';

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: LocalJsonTransLoaderFactory,
        // useFactory: HttpLoaderFactory,
        deps: [HttpClient]
        // useFactory: FbTransLoaderFactory,
        // deps: [AngularFireService]
      }
    })
  ],
  exports: [TranslatePipe, TranslateModule],
  declarations: [],
  providers: [TranslateStore]
})
export class NgTranslateModule {}
