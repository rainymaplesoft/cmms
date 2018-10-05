import { Component, OnInit } from '@angular/core';
import {
  FirebaseDataService,
  IClub,
  CollectionPath,
  IUser,
  IBooking
} from '../../Module_Firebase';
import { MetaService } from 'src/app/Module_App/meta.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rotateAnimate, pullUpDownAnimate } from '../../Module_Core';
import { PageEvent } from '@angular/material';
import { BookingService } from '../_shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-list',
  templateUrl: 'bookingList.component.html',
  styleUrls: ['bookingList.component.scss'],
  animations: [rotateAnimate, pullUpDownAnimate]
})
export class BookingListComponent implements OnInit {
  clubId: string;
  clubs: IClub[];
  club: IClub;
  bookingList: IBooking[];
  showListSection = true;
  recordCount = 0;
  title = 'Bookings';
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
    private bookingService: BookingService,
    private metaServie: MetaService
  ) {}
  ngOnInit() {
    this.getAllClubs();
  }

  getAllClubs() {
    this.dbService
      .getCollection<IClub>(CollectionPath.CLUBS, [], ['clubName', 'asc'])
      .pipe(
        map((items: IClub[]) => {
          return items.filter(i => i.isActive);
        })
      )
      .subscribe(clubs => (this.clubs = clubs));
  }

  onChangeClub(event: any) {
    // this.club = club;
    this.clubId = this.club._id;
    this.getAllBookings(this.clubId);
  }

  onPageChange($event: PageEvent) {
    this.pageConfig.pageIndex = $event.pageIndex;
    this.pageConfig.pageSize = $event.pageSize;
  }

  onRecordClick(booking: IBooking) {
    // this.selectedRecordId = user._id;
    // this.accountEdit.selectRecordId = this.selectedRecordId;
    // this.showListSection = false;
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    // this.tableContentState = this.arrowState === 'down' ? 'hide' : 'show';
  }
  private getAllBookings(clubId: string) {
    this.bookingService
      .getBookings(clubId)
      .subscribe((bookings: IBooking[]) => {
        // get bookingList
        this.bookingList = bookings
          .sort((a, b) => {
            return a.bookingDate > b.bookingDate
              ? 1
              : a.bookingDate < b.bookingDate
                ? -1
                : 0;
          })
          .slice(0, 2);
        for (const booking of this.bookingList) {
          booking.maxPlayers = this.club.maxPlayers;
        }
      });
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
