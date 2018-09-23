import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Observable } from 'rxjs';
import { FirebaseDataService, IClub } from '../../Module_Firebase';

import { CollectionPath } from '../../Module_Firebase/models';
import { ClubEditComponent } from './ClubEdit';
import { tap } from 'rxjs/operators';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-list',
  templateUrl: 'clubList.component.html',
  styleUrls: ['clubList.component.scss']
})
export class ClubListComponent implements OnInit, OnChanges {
  @ViewChild(ClubEditComponent)
  clubEdit: ClubEditComponent;

  clubCount = 0;
  alreadyCounted = false;
  clubs: Observable<any[]>;
  title = 'Club Settings';
  selectedClubId = '';

  get pageLength() {
    return this.clubCount;
  }

  pager = {
    length: 10,
    pageSize: 5,
    pageIndex: 0,
    pageSizeOptions: [5, 10]
  };

  constructor(private dbService: FirebaseDataService) {}

  ngOnInit() {
    this.clubs = this.getAllClubs();
  }

  ngOnChanges() {}

  getAllClubs() {
    return this.dbService
      .getCollection<IClub>(CollectionPath.CLUBS, [], ['clubName', 'asc'])
      .pipe(
        tap((item: any[]) => {
          this.clubCount = item.length;
        })
      );
  }

  onPageChange($event: PageEvent) {
    this.pager.pageIndex = $event.pageIndex;
    this.pager.pageSize = $event.pageSize;
  }

  onClubClick(club: IClub) {
    this.selectedClubId = club._id;
    // this.clubCount++;
  }

  onAddClubClick() {
    this.clubEdit.addNewClub = true;
  }

  checkSelected(club: IClub) {
    return this.selectedClubId === club._id;
  }

  clubTrack = (index, item) => {};

  onCheckLast(i: number) {
    // this.clubCount = i + 1;
  }

  hideByPage(i: number) {
    const index = i + 1;
    const pageNumber = this.pager.pageIndex + 1;
    const hide =
      index > this.pager.pageSize * pageNumber ||
      index <= this.pager.pageSize * (pageNumber - 1);
    return hide;
  }
}
