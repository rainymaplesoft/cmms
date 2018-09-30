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

@Injectable()
export class MetaService {
  private _firebaseUser: firebase.User;
  private _clubId: string;
  navClubCode: string;
  navigateClub: IClub;

  constructor(
    private router: Router,
    private authService: FireAuthService,
    private dbService: FirebaseDataService
  ) {
    this.authService.authState.subscribe(user => {
      this._firebaseUser = user;
      this._clubId = this.authService.loginClubId;
    });
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
    if (!this._clubId || !this._firebaseUser) {
      return of(null);
    }
    return this.getUserByEmail(this._clubId, this._firebaseUser.email);
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
      // take(1),
      map(users =>
        users.filter((u: IUser) => {
          return u.email === email;
        })
      )
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

  extractClubCode(url: string) {
    if (url.indexOf('/club/') !== 0) {
      this.navClubCode = '';
      return '';
    }
    return url.replace('/club/', '').substr(0, 4);
  }
}
