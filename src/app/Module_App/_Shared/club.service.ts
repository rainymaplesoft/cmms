import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IClub,
  CollectionPath
} from '../../Module_Firebase';

@Injectable()
export class ClubService {
  constructor(private dbService: FirebaseDataService) {}

  getClubById(clubId: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}`;
    const club = this.dbService.getDocument<IClub>(path).valueChanges();
    return club;
  }
}
