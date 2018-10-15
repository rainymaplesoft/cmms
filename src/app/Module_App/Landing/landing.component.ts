import { Component, OnInit } from '@angular/core';
import { IClub } from '../../Module_Firebase';
import { tap, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClubService } from '../_shared/club.service';

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

  constructor(private clubService: ClubService) {}

  getAllClubs() {
    return this.clubService.getAllActiveClubs().pipe(
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
