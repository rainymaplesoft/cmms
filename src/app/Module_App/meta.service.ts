import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  FireAuthService,
  IClub,
  CollectionPath,
  IUser,
  StorageItem,
  IMetaInfo
} from '../Module_Firebase';
import { Observable, of } from 'rxjs';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { StorageService } from '../Module_Core/services/storage.service';
import { UtilService } from '../Module_Core';
import { RouteName } from '../routename';
import { EventService } from '../Module_Core/services/pubsub.service';
import { EventName } from './config';
import { filter, switchMap, tap, take, delay } from 'rxjs/operators';

@Injectable()
export class MetaService {
  private _firebaseUser: firebase.User;
  private _clubId: string;
  _loggedInUser: IUser;
  navClubCode: string;
  _navClub: IClub;
  authState: Observable<firebase.User>;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private eventService: EventService,
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

  get getLoggedInUser() {
    return this.authService.getCurrentUser().pipe(take(1));
  }

  signOut() {
    this.authService.signOut();
    this.eventService.pub(EventName.Event_SignOut);
    this.router.navigate([RouteName.Home]);
  }

  getUrlClubId(url?: string) {
    return this.utilService.getUrlParam('clubId', url);
  }

  getClubById(clubId: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}`;
    const club = this.dbService.getDocument<IClub>(path);
    return club;
  }

  getClubByCode(clubCode: string) {
    const path = `${CollectionPath.CLUBS}`;
    const club = this.dbService.getCollection<IClub>(path, [
      'clubCode',
      '==',
      clubCode.toUpperCase()
    ]);
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
