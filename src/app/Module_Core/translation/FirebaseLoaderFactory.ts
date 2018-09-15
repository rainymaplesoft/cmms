import { TranslateLoader } from '@ngx-translate/core';
import { AngularFireService } from '../../Module_Shared/firebase.service';
import { Config } from '../config.core';
import { Observable } from 'rxjs';
import { KeysToUpperCase } from './util';
import { map } from 'rxjs/operators';

export class FirebaseTransLoader implements TranslateLoader {
  private _client: string;
  private _i18n: string;
  constructor(private dbService: AngularFireService, path: string) {
    this._client = Config.client;
    this._i18n = Config.i18nRoot;
  }
  public getTranslation(lang: string): any {
    // parameter "lang" is the browser language setting, which is injected by TranslateLoader
    const language = Config.getLanguage(lang);
    const path = [this._i18n, this._client, language].join('/');
    return this.dbService
      .getDbObject(path)
      .pipe(map(c => KeysToUpperCase(c))) as Observable<any>;
  }
}
export function FbTransLoaderFactory(dbService: AngularFireService) {
  return new FirebaseTransLoader(dbService, 'i18n/eaq/french');
}
