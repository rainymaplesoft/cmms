import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { FirebaseDataService, IClub } from '../../Module_Firebase';
import { rotateAnimate, pullUpDownAnimate } from '../../Module_Core';
import { AccountEditComponent } from './AccountEdit/accountEdit.component';
import { MetaService } from '../meta.service';
import { IUser, CollectionPath } from '../../Module_Firebase/models';
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

  pageConfig = {
    length: 0,
    pageSize: 5,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 20]
  };

  constructor(
    private dbService: FirebaseDataService,
    private metaServie: MetaService
  ) {}

  ngOnInit() {
    this.clubs = this.getAllClubs();
    // this.clubId = 'D82si39pqPY6EqEix8yy';
    this.accounts = this.getAllAccounts();
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
    const pathUsers = this.metaServie.getDocPathUsers(this.clubId);
    return this.dbService
      .getCollection<IClub>(pathUsers, [], ['firstName', 'asc'])
      .pipe(
        tap((item: any[]) => {
          this.pageConfig.length = item.length;
        })
      );
  }

  onChangeClub() {
    this.accounts = this.getAllAccounts();
  }

  onPageChange($event: PageEvent) {
    this.pageConfig.pageIndex = $event.pageIndex;
    this.pageConfig.pageSize = $event.pageSize;
  }

  onRecordClick(user: IUser) {
    this.selectedRecordId = user._id;
    this.accountEdit.selectRecordId = this.selectedRecordId;
    // this.showListSection = false;
  }

  // onAddClubClick() {
  //   this.clubEdit.addNewClub = true;
  //   this.showListSection = false;
  // }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    this.tableContentState = this.arrowState === 'down' ? 'hide' : 'show';
  }

  checkSelected(club: IClub) {
    return this.selectedRecordId === club._id;
  }

  clubTrack = (index, item) => {};

  showList() {
    this.showListSection = true;
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
