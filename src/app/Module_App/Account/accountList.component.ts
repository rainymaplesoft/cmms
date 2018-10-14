import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { FirebaseDataService, IClub } from '../../Module_Firebase';
import { rotateAnimate, pullUpDownAnimate } from '../../Module_Core';
import { AccountEditComponent } from './AccountEdit/accountEdit.component';
import { MetaService } from '../meta.service';
import { IUser, CollectionPath } from '../../Module_Firebase/models';
import { Config } from '../config';
import { UtilService } from '../../Module_Core/services/util.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'account-list',
  templateUrl: 'accountList.component.html',
  styleUrls: ['accountList.component.scss'],
  animations: [rotateAnimate, pullUpDownAnimate]
})
export class AccountListComponent implements OnInit, OnChanges {
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

  get pageLength() {
    return this.recordCount;
  }

  pageConfig = Config.PageConfig;

  constructor(
    private dbService: FirebaseDataService,
    private metaServie: MetaService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.metaServie.getLoggedInUser.subscribe(u => {
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

  ngOnChanges() {}

  getAllClubs() {
    return this.dbService
      .getCollection<IClub>(CollectionPath.CLUBS, [], ['clubName', 'asc'])
      .pipe(
        map((items: IClub[]) => {
          return items.filter(i => i.isActive);
        })
      );
  }

  getAllAccounts() {
    if (!this.clubId) {
      return;
    }
    const pathUsers = this.metaServie.getPathClubUsers(this.clubId);
    return this.dbService
      .getCollection<IUser>(pathUsers, [], ['isMember', 'asc'])
      .pipe(
        map((item: IUser[]) => {
          this.pageConfig.length = item.length;
          const array_sorted = this.util.sort(item, 'isMember');
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
    // this.showListSection = false;
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    this.tableContentState = this.arrowState === 'down' ? 'hide' : 'show';
  }

  checkSelected(row: IUser) {
    return this.selectedRecordId === row._id;
  }

  clubTrack = (index, item) => {};

  showList() {
    this.showListSection = true;
  }

  showSuperOption() {
    return this._loggedInUser && this._loggedInUser.isSuperAdmin;
  }
}
