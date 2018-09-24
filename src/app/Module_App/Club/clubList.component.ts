import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FirebaseDataService, IClub } from '../../Module_Firebase';
import { CollectionPath } from '../../Module_Firebase/models';
import { ClubEditComponent } from './ClubEdit';
import { rotateAnimate, pullUpDownAnimate } from '../../Module_Core';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-list',
  templateUrl: 'clubList.component.html',
  styleUrls: ['clubList.component.scss'],
  animations: [rotateAnimate, pullUpDownAnimate]
})
export class ClubListComponent implements OnInit, OnChanges {
  @ViewChild(ClubEditComponent)
  clubEdit: ClubEditComponent;

  showClubList = true;
  clubCount = 0;
  alreadyCounted = false;
  clubs: Observable<any[]>;
  title = 'Club Settings';
  selectedClubId = '';
  arrowState = 'right'; // right/down
  tableContentState = 'show'; // hide/show

  get pageLength() {
    return this.clubCount;
  }

  pageConfig = {
    length: 0,
    pageSize: 5,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 20]
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
          this.pageConfig.length = item.length;
        })
      );
  }

  onPageChange($event: PageEvent) {
    this.pageConfig.pageIndex = $event.pageIndex;
    this.pageConfig.pageSize = $event.pageSize;
  }

  onClubClick(club: IClub) {
    this.selectedClubId = club._id;
    this.clubEdit.selectClub = this.selectedClubId;
    this.showClubList = false;
  }

  onAddClubClick() {
    this.clubEdit.addNewClub = true;
    this.showClubList = false;
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    this.tableContentState = this.arrowState === 'down' ? 'hide' : 'show';
  }

  checkSelected(club: IClub) {
    return this.selectedClubId === club._id;
  }

  clubTrack = (index, item) => {};

  showList() {
    this.showClubList = true;
  }

  hideByPage(i: number) {
    const index = i + 1;
    const pageNumber = this.pageConfig.pageIndex + 1;
    const hide =
      index > this.pageConfig.pageSize * pageNumber ||
      index <= this.pageConfig.pageSize * (pageNumber - 1);
    return hide;
  }
}
