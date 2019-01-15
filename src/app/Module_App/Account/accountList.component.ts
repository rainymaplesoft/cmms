import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClub } from '../../Module_Firebase';
import { rotateAnimate, pullUpDownAnimate } from '../../Module_Core';
import { AccountEditComponent } from './AccountEdit/accountEdit.component';
import { MetaService } from '../meta.service';
import { IUser, CollectionPath } from '../../Module_Firebase/models';
import { Config } from '../config';
import { UtilService } from '../../Module_Core/services/util.service';
import { AccountService } from '../_shared';
import { ClubService } from '../_shared/club.service';
import { Select } from '@ngxs/store';
import { AppState } from '../app.store';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'account-list',
  templateUrl: 'accountList.component.html',
  styleUrls: ['accountList.component.scss'],
  animations: [rotateAnimate, pullUpDownAnimate]
})
export class AccountListComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(AccountEditComponent)
  accountEdit: AccountEditComponent;

  private _loggedInUser: IUser;
  clubId: string;
  clubs: Observable<IClub[]>;
  showListSection = true;
  recordCount = 0;
  alreadyCounted = false;
  accounts: Observable<any[]>;
  title = 'Account Settings';
  selectedRecordId = '';
  arrowState = 'right'; // right/down
  tableContentState = 'show'; // hide/show
  sortField = 'lastName'; // lastName/isMember
  sortDir = ''; // ''/'desc'

  subUser: Subscription;
  @Select(AppState.currentUser) currentUser$: Observable<IUser>;

  get pageLength() {
    return this.recordCount;
  }

  pageConfig = Config.PageConfig;

  constructor(
    private accountService: AccountService,
    private clubService: ClubService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.subUser = this.currentUser$.subscribe(u => {
      this._loggedInUser = u;
      if (u.isAdmin) {
        this.clubId = this._loggedInUser.loggedInClubId;
        this.accounts = this.getAllAccounts();
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
    return this.clubService.getAllClubs();
  }

  getAllAccounts() {
    if (!this.clubId) {
      return;
    }
    return this.accountService.getClubUsers(this.clubId).pipe(
      map((items: IUser[]) => {
        this.pageConfig.length = items.length;
        const array_sorted = this.util.sort(
          items,
          this.sortField,
          this.sortDir
        );
        const array_paged = this.util.paginate(
          array_sorted,
          this.pageConfig.pageSize,
          this.pageConfig.pageIndex
        );
        return array_paged;
      })
    );
  }

  onChangeClub() {
    this.selectedRecordId = '';
    this.accountEdit.selectRecordId = this.selectedRecordId;
    this.accounts = this.getAllAccounts();
  }

  onPageChange($event: PageEvent) {
    this.pageConfig.pageIndex = $event.pageIndex;
    this.pageConfig.pageSize = $event.pageSize;
    this.accounts = this.getAllAccounts();
  }

  onRecordClick(user: IUser) {
    this.selectedRecordId = user._id;
    this.accountEdit.selectRecordId = this.selectedRecordId;
    this.showListSection = false;
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    this.tableContentState = this.arrowState === 'down' ? 'hide' : 'show';
  }

  onSort(sortField: string) {
    if (sortField !== this.sortField) {
      this.sortField = sortField;
      this.sortDir = '';
    } else {
      this.sortDir = this.sortDir === 'desc' ? '' : 'desc';
    }
    this.accounts = this.getAllAccounts();
  }

  checkSelected(row: IUser) {
    return this.selectedRecordId === row._id;
  }

  clubTrack = (index, item) => { };

  showList() {
    this.showListSection = true;
  }

  showSuperOption() {
    return this._loggedInUser && this._loggedInUser.isSuperAdmin;
  }
}
