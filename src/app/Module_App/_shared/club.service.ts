import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IClub,
  CollectionPath
} from 'src/app/Module_Firebase';
import { map, debounceTime, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ClubService {
  constructor(private dbService: FirebaseDataService) {}

  getAllClubs(): Observable<IClub[]> {
    return this.dbService.getCollection<IClub>(
      this.pathClubs,
      [],
      ['clubName', 'asc']
    );
  }

  getAllActiveClubs(): Observable<IClub[]> {
    return this.getAllClubs().pipe(
      map((items: IClub[]) => {
        return items.filter(i => i.isActive);
      })
    );
  }

  getClubById(clubId: string): Observable<IClub> {
    return this.dbService
      .getSimpleDocument<IClub>(this.docPathClub(clubId))
      .valueChanges()
      .pipe(
        map(club => {
          club._id = clubId;
          return club;
        })
      );
  }

  getClubByCode(clubCode: string) {
    const club = this.dbService.getCollection<IClub>(this.pathClubs, [
      'clubCode',
      '==',
      clubCode.toUpperCase()
    ]);
    return club;
  }

  updateClub(clubId: string, data: any) {
    return this.dbService.updateDocument<IClub>(this.docPathClub(clubId), data);
  }

  addClub(data: any) {
    return this.dbService.addDocument(this.pathClubs, data);
  }

  private docPathClub(clubId: string) {
    return `${CollectionPath.CLUBS}/${clubId}`;
  }

  private get pathClubs() {
    return `${CollectionPath.CLUBS}`;
  }
}
