import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Module_Core';
import { IMetaInfo, IUser } from 'src/app/Module_Firebase';
import { EventName } from '../../config';
import { IClub, IBooking } from '../../../Module_Firebase/models';
import { BookingService } from '../booking.service';
import { tap, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MetaService } from '../../meta.service';

@Component({
  selector: 'app-booking',
  template: `
      <div class="booking-list" *ngIf='bookingList'>
        <div class="li"  *ngFor='let booking of bookingList; index as i;'>
          <booing-widget [booking]='booking' [loggedinUser]='user'></booing-widget>
        </div>
      </div>
      `,
  styles: [
    `
      .booking-list {
        display: flex;
      }
      @media (max-width: 900px) {
        .booking-list {
          flex-direction: column;
        }
      }
      .booking-list > .li {
        flex: 1;
      }
    `
  ]
})
export class BookingComponent implements OnInit {
  navClub: IClub;
  isLoggedIn: boolean;
  user: IUser;
  bookings: IBooking[];
  bookingList: IBooking[];
  constructor(
    private eventService: EventService,
    private router: Router,
    private metaService: MetaService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const clubId = this.metaService.getUrlClubId();
    this.metaService.getLoggedInUser
      .pipe(
        tap(u => {
          this.user = u;
        }),
        switchMap(u => {
          return this.metaService.getClubById(clubId);
        })
      )
      .subscribe(club => {
        this.navClub = club;
        this.getBookingInfo();
        this.addBookings();
      });
  }

  get clubId() {
    return this.navClub._id;
  }

  getBookingList(clubId: string) {
    this.bookingService
      .getBookings(clubId)
      .subscribe((bookings: IBooking[]) => {
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
          booking.maxPlayers = this.navClub.maxPlayers;
        }
      });
  }

  private getBookingInfo() {
    if (!this.navClub) {
      return;
    }
    this.getBookingList(this.navClub._id);

    const openDays = this.navClub.openDays.split('');
    const today = new Date();
    const weekDay = today.getDay(); // 0-6
    // let days = Date[];
    const bb = openDays
      .map(d => {
        const day = +d;
        return day < weekDay
          ? this.addDay(day + 7 - weekDay)
          : this.addDay(day - weekDay);
      })
      .sort((a, b) => {
        return a > b ? 1 : a < b ? -1 : 0;
      });
    this.bookings = bb.slice(0, 2).map(d => {
      const newBooking: IBooking = {
        dateName: d.toDateString(),
        bookingDate: d,
        isActive: true,
        clubId: this.navClub._id,
        maxPlayers: this.navClub.maxPlayers
      };
      return newBooking;
    });
  }

  private addDay(days: number) {
    const someDate = new Date();
    someDate.setDate(someDate.getDate() + days);
    return someDate;
  }

  private addBookings() {
    for (const booking of this.bookings) {
      this.bookingService
        .getBookingsByDateName(this.clubId, booking.dateName)
        .subscribe(r => {
          if (!r || r.length === 0) {
            this.bookingService.addBooking(this.navClub._id, booking);
          }
        });
    }
  }
}
