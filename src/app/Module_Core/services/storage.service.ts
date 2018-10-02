import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {}

  getItem(key: string) {
    const data = window.sessionStorage.getItem(key);
    if (typeof data === 'object') {
      return JSON.parse(data);
    }
    return data;
  }

  setItem(key: string, value: any) {
    if (typeof value === 'object') {
      const data = JSON.stringify(value);
      window.sessionStorage.setItem(key, data);
    } else {
      window.sessionStorage.setItem(key, value);
    }
    return { key, value };
  }

  removeItem(key: string) {
    window.sessionStorage.removeItem(key);
  }
}
