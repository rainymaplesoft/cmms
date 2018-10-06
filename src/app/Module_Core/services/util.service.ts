import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { KeyValue } from '../enums';

export interface IUtilService {
  isNarrowView(): boolean;
  isMobile(): boolean;
  isNumber(value: any, decimalNumber: number): boolean;
  isNullOrEmptyObject(obj): boolean;
  sanitizeUrl(url): string;
  weekDays(): KeyValue[];
  sort(): any[];
}
export interface IGetLeftResult {
  textLeft: string;
  searchIndex: number;
}
@Injectable()
export class UtilService {
  private widthNarrow = 960;

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslateService
  ) {}

  translate(...messages: string[]) {
    // returns a observable
    return this.translateService.get(messages);
  }

  public isNarrowView = (): boolean => window.innerWidth < this.widthNarrow;

  public isMobile(): boolean {
    const device = this.deviceType();
    const deviceType = this.getDeviceType(device.Mobile);
    // console.log(!!deviceType ? 'This is a Mobile: ' + deviceType : 'This is not a Mobile');
    if (!!deviceType) {
      // console.log('This is a Mobile: ' + deviceType);
    }
    return !!deviceType;
  }

  public sanitizeUrl(url): string {
    return <string>this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public isNumber(value, decimalNumber = 0): boolean {
    value = value.trim();
    if (
      value.substr(0, 1) === '0' &&
      value.length > 1 &&
      value.substr(0, 2) !== '0.'
    ) {
      return false;
    }
    if (value.substr(0, 1) === '.') {
      return false;
    }

    if (isNaN(+value)) {
      return false;
    }
    // decimal number allowed
    if (decimalNumber !== null && decimalNumber !== undefined) {
      const parts = value.split('.');
      if (parts[1] && parts[1].length > decimalNumber) {
        return false;
      }
    }
    return true;
    /*
    var numStr = /^\d*(\.\d{1,1})?$/;
    return numStr.test(value);
    */
  }

  public GetIEVersion() {
    const sAgent = window.navigator.userAgent;
    const Idx = sAgent.indexOf('MSIE');
    // If IE, return version number.
    if (Idx > 0) {
      // tslint:disable-next-line:radix
      return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf('.', Idx)));
    } else {
      if (!!navigator.userAgent.match(/Trident\/7\./)) {
        return 11;
      } else {
        return 0; // It is not IE
      }
    }
  }
  public isNullOrEmptyObject(obj): boolean {
    if (!obj) {
      return false;
    }
    return Object.keys(obj).length === 0;
  }

  public keysToLowerCase(obj) {
    const me = this;
    if (
      typeof obj === 'string' ||
      typeof obj === 'number' ||
      typeof obj === 'boolean'
    ) {
      return obj;
    }
    const keys = Object.keys(obj);
    let n = keys.length;
    let lowKey;
    while (n--) {
      const key = keys[n];
      lowKey = key.toLowerCase();
      obj[lowKey] = me.keysToLowerCase(obj[key]);
      if (key !== lowKey) {
        delete obj[key];
      }
    }
    return obj;
  }

  public sort(list: any[], prop?: string, direction?: string) {
    // direction = 'desc'
    if (prop) {
      return list.sort((a, b) => {
        if (!direction) {
          return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
        } else {
          return a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0;
        }
      });
    }
    if (!direction) {
      return list.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    } else {
      list.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
    }
  }

  public keysToUpperCase(obj) {
    const me = this;
    if (
      typeof obj === 'string' ||
      typeof obj === 'number' ||
      typeof obj === 'boolean'
    ) {
      return obj;
    }
    const keys = Object.keys(obj);
    let n = keys.length;
    let lowKey;
    while (n--) {
      const key = keys[n];
      lowKey = key.toUpperCase();
      obj[lowKey] = me.keysToUpperCase(obj[key]);
      if (key !== lowKey) {
        delete obj[key];
      }
    }
    return obj;
  }

  getUrlParam(url, parameter, defaultvalue = '') {
    let urlparameter = defaultvalue;
    if (url && url.indexOf(parameter) > -1) {
      urlparameter = this.getUrlVars(url)[parameter];
    }
    return urlparameter;
  }
  private getUrlVars(url: string) {
    const vars = {};
    const parts = url.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      (m, key, value) => (vars[key] = value)
    );
    return vars;
  }

  get weekDays(): KeyValue[] {
    return [
      { key: 0, value: 'Sunday' },
      { key: 1, value: 'Monday' },
      { key: 2, value: 'Tuesday' },
      { key: 3, value: 'Wednesday' },
      { key: 4, value: 'Thursday' },
      { key: 5, value: 'Friday' },
      { key: 6, value: 'Saturday' }
    ];
  }

  get weekDaysSimple(): KeyValue[] {
    return [
      { key: 0, value: 'Sun' },
      { key: 1, value: 'Mon' },
      { key: 2, value: 'Tue' },
      { key: 3, value: 'Wed' },
      { key: 4, value: 'Thu' },
      { key: 5, value: 'Fri' },
      { key: 6, value: 'Sat' }
    ];
  }

  //#region private helper functions */

  private deviceType() {
    return {
      Windows: 'Windows',
      MacOs: 'MacOs',
      Android: 'Android',
      iOS: 'iOS',
      Mobile: 'Mobile'
    };
  }

  private getDeviceType(typeName) {
    // var deviceType = getDeviceType();

    const testType = {
      Android: function() {
        if (!navigator.userAgent.match(/Android/i)) {
          return '';
        }
        return 'Android';
      },
      BlackBerry: function() {
        if (!navigator.userAgent.match(/BlackBerry/i)) {
          return '';
        }
        return 'BlackBerry';
      },
      iOS: function() {
        if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          return '';
        }
        return 'iPhone/iPad';
      },
      Opera: function() {
        if (!navigator.userAgent.match(/Opera Mini/i)) {
          return '';
        }
        return 'Opera Mini';
      },
      Windows: function() {
        if (!navigator.userAgent.match(/IEMobile/i)) {
          return '';
        }
        return 'IE Mobile';
      },
      MacOs: function() {
        if (navigator.userAgent.indexOf('Mac') === -1) {
          return '';
        }
        return 'Mac OS';
      },
      Mobile: function() {
        const type =
          testType.Android() ||
          testType.BlackBerry() ||
          testType.iOS() ||
          testType.Opera() ||
          testType.Windows() ||
          testType.MacOs();
        if (!type) {
          return '';
        }
        return type;
      }
    };

    return testType[typeName]();
  }

  /* HighLight KeyWord */
  // in component: this.highLighted = this.util.highLightKeyWord(this.textSource, this.textSearch);
  // in template: <div [innerHTML]='highLighted|safeHtml'></div>

  public highLightKeyWord(
    textSource: string,
    textSearch: string,
    color = '#f8f875'
  ) {
    let highLighted = '';
    let searchIndex = 0;
    let loop = true;
    let target = textSource.substr(0);
    let leftText = '';
    let startPoint = 0;
    let loopTimes = 0;
    do {
      target = target.substr(startPoint);
      const result = this.getLeftText(target, textSearch);
      leftText = result.textLeft;
      searchIndex = result.searchIndex;
      if (leftText === null) {
        highLighted = highLighted + target;
        loop = false;
        break;
      }
      startPoint = leftText.length + textSearch.length;
      const highLightedMatch = this.gethighLightedMatch(
        target,
        searchIndex,
        textSearch,
        color
      );
      highLighted = highLighted + leftText + highLightedMatch;
      loopTimes++;
    } while (loop && loopTimes < 100);

    return highLighted;
  }

  private getLeftText(text: string, search: string): IGetLeftResult {
    const i = text.toLowerCase().indexOf(search.toLowerCase());
    if (i === -1) {
      return { textLeft: null, searchIndex: -1 };
    }
    const textLeft = text.substr(0, i);
    const result: IGetLeftResult = { textLeft: textLeft, searchIndex: i };
    return result;
  }

  private gethighLightedMatch(
    target: string,
    index: number,
    textSearch: string,
    color: string
  ) {
    const match = target.substr(index, textSearch.length);
    const highLightedMatch = `<span style="background-color:${color}">${match}</span>`;
    return highLightedMatch;
  }
}
//#endregion
