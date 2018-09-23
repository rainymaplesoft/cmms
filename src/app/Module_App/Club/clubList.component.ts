import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Observable } from 'rxjs';
import { FirebaseDataService, IClub } from '../../Module_Firebase';

import { CollectionPath } from '../../Module_Firebase/models';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-list',
  templateUrl: 'clubList.component.html',
  styleUrls: ['clubList.component.scss']
})
export class ClubListComponent implements OnInit {
  clubs: Observable<any[]>;
  selectedClubId = '';
  length = 10;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];

  constructor(private dbService: FirebaseDataService) {}

  ngOnInit() {
    this.getAllClubs();
  }

  getAllClubs() {
    this.clubs = this.dbService.getCollection<IClub>(CollectionPath.CLUBS);
  }

  onPageChange($event: PageEvent) {
    const event = $event;
  }

  onClubClick(club: IClub) {
    this.selectedClubId = club._id;
  }
}
