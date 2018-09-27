import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IClub,
  CollectionPath,
  IUser
} from '../../Module_Firebase';
import { filter, take, map } from 'rxjs/operators';

@Injectable()
export class ClubService {
  constructor(private dbService: FirebaseDataService) {}

  getClubById(clubId: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}`;
    const club = this.dbService.getDocument<IClub>(path).valueChanges();
    return club;
  }

  getUserByEmail(clubId: string, email: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.USERS}`;
    const user = this.dbService.getSimpleCollection<IUser>(path).pipe(
      // take(1),
      filter(u => {
        const aa = u;
        return !!u;
      })
    );
    return user;
  }
}
