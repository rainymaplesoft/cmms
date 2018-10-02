import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  FireAuthService,
  IClub,
  CollectionPath,
  IUser
} from '../Module_Firebase';
import { filter, take, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { EventService } from '../Module_Core';
import { OnEvent } from './config';

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
    private eventService: EventService,
    private authService: FireAuthService,
    private dbService: FirebaseDataService
  ) {
    this.authState = this.authService.authState;
    this.setEvents();
  }

  setEvents() {
    this.authService.authState.subscribe(user => {
      this._firebaseUser = user;
      this._clubId = this.authService.loginClubId;
    });
    this.eventService.on<boolean>(OnEvent.Event_SignOut).subscribe(c => {
      this._loggedInUser = null;
    });
    this.eventService.on<IUser>(OnEvent.Event_SignIn).subscribe(user => {
      this._loggedInUser = user;
    });
  }

  logout() {
    this.authService.signOut();
    this.eventService.pub(OnEvent.Event_SignOut);
  }
  get IsLogIn(): boolean {
    return !!this._firebaseUser;
  }

  get LoginClubId() {
    return this._clubId;
  }

  get LoggedInClub(): Observable<IClub> {
    if (!this._clubId) {
      return of(null);
    }
    return this.getClubById(this._clubId);
  }

  get LoggedInUser() {
    return this._loggedInUser;
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

  getUserByEmail(clubId: string, email: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.USERS}`;
    const user = this.dbService.getSimpleCollection<IUser>(path).pipe(
      map(users =>
        users.filter((u: IUser) => {
          return u.email === email;
        })
      )
      // take(1)
    );
    return user;
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
