import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IClub,
  CollectionPath
} from 'src/app/Module_Firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ClubService {
  constructor(private dbService: FirebaseDataService) {}

  getAllClubs(): Observable<IClub[]> {
    return this.dbService.getCollection<IClub>(
      CollectionPath.CLUBS,
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
      .valueChanges();
  }

  private docPathClub(clubId: string) {
    return `${CollectionPath.CLUBS}/${clubId}`;
  }
}
