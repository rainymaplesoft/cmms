import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CollectionPath, IUser, IClub } from '../../Module_Firebase/models';
import { ClubEditComponent } from './ClubEdit';
import { rotateAnimate, pullUpDownAnimate } from '../../Module_Core';
import { Config } from '../config';
import { MetaService } from '../meta.service';
import { ClubService } from '../_shared/club.service';
import { UtilService } from '../../Module_Core/services/util.service';
import { Select } from '@ngxs/store';
import { AppState } from '../app.store';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-list',
  templateUrl: 'clubList.component.html',
  styleUrls: ['clubList.component.scss'],
  animations: [rotateAnimate, pullUpDownAnimate]
})
export class ClubListComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(ClubEditComponent)
  clubEdit: ClubEditComponent;

  private _loggedInUser: IUser;
  showClubList = true;
  clubCount = 0;
  alreadyCounted = false;
  clubs: Observable<IClub[]>;
  title = 'Club Settings';
  selectedClubId = '';
  arrowState = 'right'; // right/down
  tableContentState = 'show'; // hide/show

  pageConfig = Config.PageConfig;
  subUser: Subscription;
  @Select(AppState.currentUser) currentUser$: Observable<IUser>;

  constructor(
    private metaServie: MetaService,
    private clubservice: ClubService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.subUser = this.currentUser$.subscribe(u => {
      this._loggedInUser = u;
      if (u.isAdmin) {
        this.selectedClubId = this._loggedInUser.loggedInClubId;
        this.clubEdit.selectClub = this.selectedClubId;
        return;
      }
      if (u.isSuperAdmin) {
        this.clubs = this.getAllClubs();
      }
    });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }

  ngOnChanges() { }

  getAllClubs() {
    return this.clubservice.getAllClubs().pipe(
      map((clubs: IClub[]) => {
        this.pageConfig.length = clubs.length;
        const array_paged = this.util.paginate(
          clubs,
          this.pageConfig.pageSize,
          this.pageConfig.pageIndex
        );
        return array_paged;
      })
    );
  }

  onPageChange($event: PageEvent) {
    this.pageConfig.pageIndex = $event.pageIndex;
    this.pageConfig.pageSize = $event.pageSize;
    this.getAllClubs();
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

  clubTrack = (index, item) => { };

  showList() {
    this.showClubList = true;
  }

  showSuperOption() {
    return this._loggedInUser && this._loggedInUser.isSuperAdmin;
  }
}
