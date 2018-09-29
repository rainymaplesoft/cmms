import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IClub,
  CollectionPath,
  IUser
} from '../../Module_Firebase';
import { filter, take, map } from 'rxjs/operators';
import { FireAuthService } from '../../Module_Firebase/firebase.auth.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class MetaService {
  private _firebaseUser: firebase.User;
  _clubId: string;

  constructor(
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

  get Club(): Observable<IClub> {
    if (!this._clubId) {
      return of(null);
    }
    return this.getClubById(this._clubId);
  }

  get User() {
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
}
