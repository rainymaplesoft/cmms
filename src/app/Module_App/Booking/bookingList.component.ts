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
import {
  rotateAnimate,
  pullUpDownAnimate,
  UtilService
} from '../../Module_Core';
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
  bookedPlayers: IUser[];
  selectedBookingId: string;
  showListSection = true;
  recordCount = 0;
  title = 'Bookings';
  selectedRecordId = '';
  arrowState = 'right'; // right/down
  chipState = {}; // hide/show
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
    private util: UtilService
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
    this.bookingService
      .getBookingUsers(this.clubId, booking._id)
      .subscribe(u => (this.bookedPlayers = u));
    this.selectedBookingId = booking._id;

    for (const key in this.chipState) {
      if (this.chipState.hasOwnProperty(key)) {
        this.chipState[key] = 'hide';
      }
    }
    this.chipState[booking._id] = 'show';
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
  }

  private getAllBookings(clubId: string) {
    this.bookingService
      .getBookings(clubId)
      .subscribe((bookings: IBooking[]) => {
        // get bookingList
        this.bookingList = this.util.sort(bookings, 'bookingDate', 'desc');
        for (const booking of this.bookingList) {
          booking.maxPlayers = this.club.maxPlayers;
          this.chipState[booking._id] = 'hide';
        }
        this.pageConfig.length = this.bookingList.length;
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
