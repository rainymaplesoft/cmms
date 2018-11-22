import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IUser,
  CollectionPath
} from '../../Module_Firebase';
import { filter, map, take, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
  constructor(private dbService: FirebaseDataService) {}

  getClubUsers(clubId: string): Observable<IUser[]> {
    const pathUsers = this.getPathClubUsers(clubId);
    return this.dbService.getCollection<IUser>(pathUsers);
  }

  getClubUserById(clubId: string, userId: string): Observable<IUser> {
    const pathUser = this.getPathClubUser(clubId, userId);
    return this.dbService.getSimpleDocument<IUser>(pathUser).valueChanges();
  }

  getClubUserByIds(clubId: string, userIds: string[]): Observable<IUser[]> {
    return this.getClubUsers(clubId).pipe(
      map(users => {
        return users.filter(u => userIds.includes(u._id));
      })
    );
  }

  getClubUserByEmail(clubId: string, email: string) {
    const pathUsers = this.getPathClubUsers(clubId);
    const result = this.dbService
      .getCollection(pathUsers, ['email', '==', email])
      .pipe(
        // take(1),
        map(arr => {
          if (arr && arr.length > 0) {
            return arr[0];
          } else {
            return null;
          }
        }),
        catchError(e => null)
      );
    return result;
  }

  updateClubUser(clubId: string, userId: string, data: any) {
    const pathClubUser = this.getPathClubUser(clubId, userId);
    return this.dbService.updateDocument<IUser>(pathClubUser, data);
  }

  updateUserLoginInfo(u: IUser) {
    const pathUser = `users/${u._id}`;
    const data = {
      isAdmin: u.isAdmin ? u.isAdmin : false,
      isMember: u.isMember ? u.isMember : false,
      isSuperAdmin: u.isSuperAdmin ? u.isSuperAdmin : false,
      clubId: u.loggedInClubId ? u.loggedInClubId : ''
    };
    return this.dbService.updateSetDocument<IUser>(pathUser, data);
  }

  private getPathClubUsers(clubId: string) {
    return `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.USERS}`;
  }

  private getPathClubUser(clubId: string, userId: string) {
    return `${CollectionPath.CLUBS}/${clubId}/${
      CollectionPath.USERS
    }/${userId}`;
  }
}
