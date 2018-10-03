import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  FireAuthService,
  IClub,
  CollectionPath,
  IUser,
  StorageItem
} from '../Module_Firebase';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../Module_Core/services/storage.service';
import { UtilService } from '../Module_Core';

@Injectable()
export class MetaService {
  private _firebaseUser: firebase.User;
  private _clubId: string;
  _loggedInUser: IUser;
  navClubCode: string;
  navigateClub: IClub;
  authState: Observable<firebase.User>;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private authService: FireAuthService,
    private dbService: FirebaseDataService,
    private storageService: StorageService
  ) {}

  get clubId() {
    return this.storageService.getItem(StorageItem.CLUB_ID);
  }

  get userId() {
    return this.storageService.getItem(StorageItem.USER_ID);
  }

  get IsLogIn(): boolean {
    return !!this._firebaseUser;
  }

  get loggedInClub(): Observable<IClub> {
    if (!this.clubId) {
      return of(null);
    }
    return this.getClubById(this.clubId);
  }

  get loggedInUser() {
    return this.authService.getCurrentUser();
  }

  signOut() {
    this.authService.signOut();
  }

  getUrlClubId(url: string) {
    return this.utilService.getUrlParam(url, 'clubId');
  }

  getClubById(clubId: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}`;
    const club = this.dbService.getDocument<IClub>(path).valueChanges();
    return club;
  }

  getClubByCode(clubCode: string) {
    const path = `${CollectionPath.CLUBS}`;
    const club = this.dbService.getCollection<IClub>(path, [
      'clubCode',
      '==',
      clubCode.toUpperCase()
    ]); // .pipe(take(1));
    return club;
  }

  getNavClub(clubCode: string) {
    const path = `${CollectionPath.CLUBS}`;
    const club = this.dbService.getCollection<IClub>(path, [
      'clubCode',
      '==',
      clubCode.toUpperCase()
    ]); // .pipe(take(1));
    return club;
  }

  getDocPathClub(clubId: string) {
    return `${CollectionPath.CLUBS}/${clubId}`;
  }

  getDocPathUser(clubId: string, userId: string) {
    return `${CollectionPath.CLUBS}/${clubId}/${
      CollectionPath.USERS
    }/${userId}`;
  }

  getDocPathUsers(clubId: string) {
    return `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.USERS}`;
  }

  extractClubCode(url: string) {
    if (url.indexOf('/club/') !== 0) {
      this.navClubCode = '';
      return '';
    }
    return url.replace('/club/', '').substr(0, 4);
  }
}
