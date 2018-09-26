import { Component, OnInit } from '@angular/core';
import {
  FirebaseDataService,
  IClub,
  CollectionPath
} from '../../Module_Firebase';
import { tap, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.scss']
})
export class LandingComponent implements OnInit {
  title = 'Welcome to the home page';
  clubPlus: any[];
  clubs: Observable<IClub[]>;

  clubImages = ['LPBC', 'LVBC', 'WIBC', 'TABC', 'TBBC', 'TCBC'].map(
    i => `assets/img/club/club_entry_${i}.jpg`
  );
  images = [1, 2, 3].map(i => `assets/img/car_${i}.jpg`);

  constructor(private dbService: FirebaseDataService) {}

  getAllClubs() {
    return this.dbService
      .getCollection<IClub>(CollectionPath.CLUBS, [], ['clubName', 'asc'])
      .pipe(
        map((clubs: IClub[]) => {
          const bb = clubs.filter(c => c.isActive);
          return bb;
        }),
        tap((item: IClub[]) => {
          const plus = 3 - (item.length % 3);
          this.clubPlus = [...Array(plus)];
        })
      );
  }
  ngOnInit() {
    this.clubs = this.getAllClubs();
  }

  getClubImage(club: IClub) {
    return `assets/img/club/club_entry_${club.clubCode}.jpg`;
  }
}
