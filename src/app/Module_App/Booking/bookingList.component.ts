import { Component, OnInit } from '@angular/core';
import { IClub, IUser, IBooking } from '../../Module_Firebase';
import { MetaService } from '../meta.service';
import { Observable, pipe } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import {
  rotateAnimate,
  pullUpDownAnimate,
  UtilService
} from '../../Module_Core';
import { PageEvent } from '@angular/material';
import { BookingService, ClubService } from '../_shared';
import { Config } from '../config';
import { AccountService } from '../_shared/account.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-list',
  templateUrl: 'bookingList.component.html',
  styleUrls: ['bookingList.component.scss'],
  animations: [rotateAnimate, pullUpDownAnimate]
})
export class BookingListComponent implements OnInit {
  private _loggedInUser: IUser;
  clubId: string;
  clubs: Observable<IClub[]>;
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
  maxPlayers: number;
  get pageLength() {
    return this.recordCount;
  }

  pageConfig = Config.PageConfig;

  constructor(
    private bookingService: BookingService,
    private accountService: AccountService,
    private clubservice: ClubService,
    private metaServie: MetaService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.metaServie.getLoggedInUser.subscribe(u => {
      this._loggedInUser = u;
      if (u.isAdmin) {
        this.clubId = this._loggedInUser.loggedInClubId;
        this.clubservice.getClubById(this.clubId).subscribe(club => {
          this.maxPlayers = club.maxPlayers;
          this.getAllBookings(this.clubId);
        });
        return;
      }
      if (u.isSuperAdmin) {
        this.clubs = this.getAllClubs();
      }
    });
  }

  getAllClubs() {
    return this.clubservice.getAllClubs().pipe(
      map((items: IClub[]) => {
        return items.filter(i => i.isActive);
      })
    );
  }

  onChangeClub(event: any) {
    this.clubId = this.club._id;
    this.maxPlayers = this.club.maxPlayers;
    this.getAllBookings(this.clubId);
  }

  onPageChange($event: PageEvent) {
    this.pageConfig.pageIndex = $event.pageIndex;
    this.pageConfig.pageSize = $event.pageSize;
    this.getAllBookings(this.clubId);
  }

  onRecordClick(booking: IBooking) {
    this.bookingService
      .getBookingUsers(this.clubId, booking._id)
      .pipe(
        switchMap(users => {
          const userIds = users.map(u => u._id);
          return this.accountService.getClubUserByIds(this.clubId, userIds);
        })
      )
      .subscribe(u => {
        this.bookedPlayers = u;
      });
    this.selectedBookingId = booking._id;

    // toggle the chips panel
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
        this.pageConfig.length = bookings.length;
        const array_sorted = this.util.sort(bookings, 'bookingDate', 'desc');
        this.bookingList = this.util.paginate(
          array_sorted,
          this.pageConfig.pageSize,
          this.pageConfig.pageIndex
        );
        for (const booking of this.bookingList) {
          booking.maxPlayers = this.maxPlayers;
          this.chipState[booking._id] = 'hide';
        }
      });
  }

  showSuperOption() {
    return this._loggedInUser && this._loggedInUser.isSuperAdmin;
  }
}
