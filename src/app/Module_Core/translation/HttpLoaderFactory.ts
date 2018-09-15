import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Config } from '../config.core';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {

  const origin = window.location.origin;
  let baseUrl = Config.getBaseUri();
  let assetPath = '';

  if (origin.indexOf(':4200') > 0) {
    baseUrl = 'http://localhost:4200/';
    assetPath = '';
  }

  const localePath = baseUrl + assetPath + 'i18n/';
  // console.log('app.module=> localePath: ' + localePath);
  return new TranslateHttpLoader(http, localePath);
}
